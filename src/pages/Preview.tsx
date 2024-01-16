import { NavLink } from 'react-router-dom';
import MobileMockup from '../components/MobileMockup';
import '../styles/components/preview.scss';
import { useState } from 'react';
import Popup from '../components/elements/Popup';
import useUserPlatforms from '../hooks/useUserPlatforms';

const Preview = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { userPlatforms } = useUserPlatforms();

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
          <MobileMockup userPlatforms={userPlatforms} />
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
