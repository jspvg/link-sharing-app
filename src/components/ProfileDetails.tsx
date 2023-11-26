const ProfileDetails = () => {
  return (
    <div className="customize-div">
      <div className="customize-header">
        <h1>Profile details</h1>
        <p className="header-p">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <div className="link-input">
        <label className="profile-label">
          <p>Profile picture</p>
          <button className="button">+Upload Image</button>
          <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </label>
      </div>
      <div className="customize-body">
        <form className="link-input">
          <label className="profile-label">
            <p>First name*</p>
            <input type="text" className="element-input" />
            <p></p>
          </label>
          <label className="profile-label">
            <p>Last name*</p>
            <input type="text" className="element-input" />
            <p></p>
          </label>
          <label className="profile-label">
            <p>Email</p>
            <input type="text" className="element-input" />
            <p></p>
          </label>
        </form>
      </div>

      <div className="save-button">
        {/* TODO manage disabled state */}
        <button className="button">Save</button>
      </div>
    </div>
  );
};

export default ProfileDetails;
