import useUser from '../hooks/useUser';
import { addProfilePicture } from '../lib/api/mutations';

const ProfileDetails = () => {
  const { user } = useUser();
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const picture = event.target.files![0];
    addProfilePicture(user!.id, picture);
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
            <button className="nav-link active" onClick={() => handleAddImage}>
              + Upload Image
              <input type="file" onChange={handleAddImage} />
            </button>
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
            />
          </label>
          <label className="profile-label">
            <p>Last name*</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. Appleseed"
            />
          </label>
          <label className="profile-label">
            <p>Email</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. email@example.com"
            />
          </label>
        </form>
      </div>

      <div className="save-button">
        {/* TODO manage disabled state */}
        <button className="button">Save</button>
      </div>
    </>
  );
};

export default ProfileDetails;
