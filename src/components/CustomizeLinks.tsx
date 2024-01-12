import { useEffect, useState } from 'react';
import { Platform } from '../lib/types';
import { fetchPlatforms } from '../lib/api/queries';
import Dropdown from './elements/Dropdown';
import '../styles/components/customize.scss';

type UserPlatform = {
  platform: Platform | null;
  linkUrl: string;
};

const CustomizeLinks = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [userPlatforms, setUserPlatforms] = useState<UserPlatform[]>([]);

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

  const handleRemovePlatform = (index: number) => {
    const newUserPlatforms = [...userPlatforms];
    newUserPlatforms.splice(index, 1);
    setUserPlatforms(newUserPlatforms);
  };

  const handleAddLink = () => {
    setIsActive(true);
  };

  const handleSaveLink = () => {
    const newUserPlatform: UserPlatform = {
      platform,
      linkUrl,
    };
    setUserPlatforms([...userPlatforms, newUserPlatform]);
    setIsActive(false);
    setPlatform(null);
    setLinkUrl('');
  };

  const handleCancelAdd = () => {
    setIsActive(false);
  };

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
          const userPlatform = userPlatforms[index];
          return userPlatform ? (
            <div className="platform" key={index}>
              <img src={userPlatform.platform?.logo} alt="" />
              <p>{userPlatform.platform?.name}</p>
              <button onClick={() => handleRemovePlatform(index)}>x</button>
            </div>
          ) : (
            <div className="platform" key={index}>
              {/* TODO Render empty platform component */}
            </div>
          );
        })}
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
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </form>
        )}
      </div>
      <div className="save-button">
        <button className="button" onClick={handleSaveLink}>
          Save
        </button>
      </div>
    </>
  );
};

export default CustomizeLinks;
