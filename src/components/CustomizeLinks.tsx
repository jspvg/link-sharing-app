import { useCallback, useEffect, useState } from 'react';
import { Platform, UserPlatformData } from '../lib/types';
import { fetchPlatforms, fetchUserPlatforms } from '../lib/api/queries';
import Dropdown from './elements/Dropdown';
import '../styles/components/customize.scss';
import useUser from '../hooks/useUser';
import SmallPlatform from './platform/SmallPlatform';
import { addUserPlatform, deleteUserPlatform } from '../lib/api/mutations';

const emptyUserPlatform = {
  platform_id: '',
  name: '',
  logo_gray: '',
  logo_white: '',
  color: '',
  url: '',
};

const CustomizeLinks = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platform, setPlatform] = useState<Platform>(emptyUserPlatform);
  const [url, seturl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [userPlatforms, setUserPlatforms] = useState<UserPlatformData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<UserPlatformData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchUserPlatforms(user.id)
        .then((fetchedData) => {
          setData(fetchedData);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user platforms:', err);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    const getPlatforms = async () => {
      try {
        const platforms = await fetchPlatforms();
        setPlatforms(platforms);
      } catch (err) {
        console.error('Data could not be fetched: ', err);
      }
    };

    getPlatforms();
  }, []);

  const handleRemovePlatform = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      const platformToRemove = data[index];

      // Delete the platform from the database
      try {
        await deleteUserPlatform({
          user_id: platformToRemove.user_id,
          platform_id: platformToRemove.platform_id,
        });
      } catch (error) {
        console.error('Failed to delete platform:', error);
        return;
      }

      // Remove the platform from the local state
      setUserPlatforms((prevPlatforms) =>
        prevPlatforms.filter((_, i) => i !== index),
      );
    },
    [data],
  );

  const handleAddLink = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleSaveLink = useCallback(() => {
    const newUserPlatform: UserPlatformData = {
      name: platform?.name,
      logo_gray: platform?.logo_gray,
      logo_white: platform?.logo_white,
      color: platform?.color,
      user_id: user!.id,
      platform_id: platform.platform_id,
      platforms,
      url,
    };
    setUserPlatforms([...userPlatforms, newUserPlatform]);
    setIsActive(false);
    setPlatform(emptyUserPlatform);
    seturl('');
    addUserPlatform(newUserPlatform);
  }, [platform, url, userPlatforms, user, platforms]);

  const handleCancelAdd = useCallback(() => {
    setIsActive(false);
  }, []);

  if (loading) {
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
        {!loading && Array.from({ length: 5 }).map((_, index) => (
          <SmallPlatform
            key={index}
            userPlatform={data[index]}
            index={index}
            handleRemovePlatform={handleRemovePlatform}
          />
        ))}
      </div>
      <div className={`customize-body`}>
        {isActive && (
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
              selectedPlatform={platform}
              onSelect={setPlatform}
            />
            <label>Link</label>
            <input
              type="url"
              className="element-input"
              placeholder="e.g. https://www.github.com/johnappleseed"
              value={url}
              onChange={(e) => seturl(e.target.value)}
            />
          </form>
        )}
      </div>
      <div className="save-button">
        <button
          className="button"
          onClick={handleSaveLink}
          disabled={!isActive}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default CustomizeLinks;
