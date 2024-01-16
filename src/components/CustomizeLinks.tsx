import { useCallback, useEffect, useState } from 'react';
import { Platform, UserPlatform } from '../lib/types';
import { fetchPlatforms, fetchUserPlatforms } from '../lib/api/queries';
import Dropdown from './elements/Dropdown';
import useUser from '../hooks/useUser';
import SmallPlatform from './platform/SmallPlatform';
import { addUserPlatform, deleteUserPlatform } from '../lib/api/mutations';
import '../styles/components/customize.scss';

const emptyPlatform = {
  platform_id: '',
  name: '',
  logo_gray: '',
  logo_white: '',
  color: '',
  url: '',
};

const CustomizeLinks = () => {
  const { user } = useUser();

  const [userPlatforms, setUserPlatforms] = useState<UserPlatform[]>([]);
  const [isLoadingUserPlatforms, setIsLoadingUserPlatforms] = useState(true);

  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatform, setSelectedPlatform] =
    useState<Platform>(emptyPlatform);
  const [platformUrl, setPlatformUrl] = useState('');

  const [isAddingPlatform, setIsAddingPlatform] = useState(false);

  const fetchAndSetUserPlatforms = useCallback(async () => {
    if (user) {
      try {
        const fetchedUserPlatforms = await fetchUserPlatforms(user.id);
        setUserPlatforms(fetchedUserPlatforms);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingUserPlatforms(false);
      }
    }
  }, [user]);

  const fetchAndSetPlatforms = useCallback(async () => {
    try {
      const fetchedPlatforms = await fetchPlatforms();
      setPlatforms(fetchedPlatforms);
    } catch (err) {
      console.error('Data could not be fetched: ', err);
    }
  }, []);

  useEffect(() => {
    fetchAndSetUserPlatforms();
    fetchAndSetPlatforms();
  }, [fetchAndSetPlatforms, fetchAndSetUserPlatforms]);

  const handleRemovePlatform = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      const platformToRemove = userPlatforms[index];

      try {
        await deleteUserPlatform({
          user_id: platformToRemove.user_id,
          platform_id: platformToRemove.platform_id,
        });
      } catch (error) {
        console.error('Failed to delete platform:', error);
        return;
      }

      setUserPlatforms((prevPlatforms) =>
        prevPlatforms.filter((_, i) => i !== index),
      );
    },
    [userPlatforms],
  );

  const handleAddLink = useCallback(() => {
    if (userPlatforms.length >= 5) {
      alert('You cannot add more than 5 platforms.');
      return;
    }

    setIsAddingPlatform(true);
  }, [userPlatforms]);

  const handleSaveLink = useCallback(() => {
    const newUserPlatform: UserPlatform = {
      user_id: user!.id,
      platform_id: selectedPlatform.platform_id,
      url: platformUrl,
    };

    setUserPlatforms((prevPlatforms) => [...prevPlatforms, newUserPlatform]);

    setIsAddingPlatform(false);
    setSelectedPlatform(emptyPlatform);
    setPlatformUrl('');

    addUserPlatform(newUserPlatform);
  }, [user, selectedPlatform.platform_id, platformUrl]);

  const handleCancelAdd = useCallback(() => {
    setIsAddingPlatform(false);
  }, []);

  if (isLoadingUserPlatforms) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="customize-header">
        <h1>Customize your links</h1>
        <p className="header-p">
          Add/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          className="nav-link nav-preview link-button"
          onClick={handleAddLink}
        >
          + Add new link
        </button>
      </div>
      <div className="added-platforms">
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < userPlatforms.length) {
            // Render SmallPlatform with userPlatform data
            return (
              <SmallPlatform
                key={index}
                userPlatform={userPlatforms[index]}
                index={index}
                handleRemovePlatform={handleRemovePlatform}
              />
            );
          } else {
            // Render placeholder
            return (
              <div className="platform" key={index}>
                {/* Render empty platform elements as placeholders */}
              </div>
            );
          }
        })}
      </div>
      <div className={`customize-body`}>
        {isAddingPlatform && (
          <form className="link-form">
            <div className="form-header">
              <h2>New Link</h2>
              <p>
                <button onClick={handleCancelAdd}>Cancel</button>
              </p>
            </div>

            <label>Platform</label>
            <Dropdown
              platforms={platforms}
              selectedPlatform={selectedPlatform}
              onSelect={setSelectedPlatform}
            />
            <label>Link</label>
            <input
              type="url"
              className="element-input"
              placeholder="e.g. https://www.github.com/johnappleseed"
              value={platformUrl}
              onChange={(e) => setPlatformUrl(e.target.value)}
            />
          </form>
        )}
      </div>
      <div className="save-button">
        <button
          className="button"
          onClick={handleSaveLink}
          disabled={!isAddingPlatform}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default CustomizeLinks;
