import { NavLink } from 'react-router-dom';
import MobileMockup from '../components/MobileMockup';
import '../styles/components/preview.scss';
import { useEffect, useState } from 'react';
import Popup from '../components/elements/Popup';
import useUserPlatforms from '../hooks/useUserPlatforms';
import { fetchUserDetails } from '../lib/api/queries';
import { UserDetails } from '../lib/types';
import { useUser } from '../hooks/useUser';

const Preview = () => {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { userPlatforms } = useUserPlatforms();

  useEffect(() => {
    if (user) {
      fetchUserDetails(user.id).then(setUserDetails).catch(console.error);
    }
  }, [user]);

  const copyToClipboard = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      })
      .catch((err) => {
        setIsCopied(false);
        console.log('Error in copying content: ', err);
      });
  };

  const handleButtonClick = () => {
    copyToClipboard(window.location.href);
  };

  return (
    <>
      <div className="preview-body">
        <nav>
          <div className="nav-div-preview">
            <NavLink to="/" className="nav-link nav-preview">
              Back to Editor
            </NavLink>
            <button className="share-button" onClick={handleButtonClick}>
              Share Link
            </button>
          </div>
        </nav>

        <div className="phone">
          <MobileMockup
            userPlatforms={userPlatforms}
            userDetails={userDetails}
          />
        </div>
      </div>
      <div className="popup-div">
        {isCopied && (
          <Popup message="The link has been copied to your clipboard!" />
        )}
      </div>
    </>
  );
};

export default Preview;
