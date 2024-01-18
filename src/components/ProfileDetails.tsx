import { useState } from 'react';
import useUser from '../hooks/useUser';
import { addProfilePicture } from '../lib/api/mutations';

const ProfileDetails = () => {
  const { user } = useUser();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedPicture = event.target.files![0];
    setPicture(uploadedPicture);
  };

  const handleSaveDetails = () => {
    console.log(picture);
    if (user && picture) {
      addProfilePicture(user.id, picture);
      setPicture(null);
    }
  };

  return (
    <>
      <div className="customize-header">
        <h1>Profile details</h1>
        <p className="header-p">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <div className="link-input">
        <label className="profile-label">
          <p>Profile picture</p>
          <div>
            <input
              className="nav-link active"
              type="file"
              onChange={(event) => handleAddImage(event)}
            />

            <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </div>
        </label>
      </div>
      <div className="customize-body">
        <form className="link-input">
          <label className="profile-label">
            <p>First name*</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. John"
              value={fname}
              onChange={(event) => setFname(event.target.value)}
            />
          </label>
          <label className="profile-label">
            <p>Last name*</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. Appleseed"
              value={lname}
              onChange={(event) => setLname(event.target.value)}
            />
          </label>
          <label className="profile-label">
            <p>Email</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. email@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </form>
      </div>

      <div className="save-button">
        <button className="button" onClick={handleSaveDetails}>
          Save
        </button>
      </div>
    </>
  );
};

export default ProfileDetails;
