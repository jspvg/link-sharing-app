import { upsertUserDetails } from '../lib/api/mutations';
import { useUser } from '../hooks/useUser';
import { fetchUserDetails } from '../lib/api/queries';
import { useUserDetails } from '../hooks/useUserDetails';

const ProfileDetails = () => {
  const { user } = useUser();
  const { setUserDetails, state, dispatch } = useUserDetails();

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedPicture = event.target.files![0];
    dispatch({ type: 'setPicture', payload: uploadedPicture });
  };

  const handleSaveDetails = async () => {
    if (user) {
      try {
        const currentUserDetails = (await fetchUserDetails(user.id)) || {};

        const updatedUserDetails = {
          ...currentUserDetails,
          f_name: state.fname || currentUserDetails.f_name || '',
          l_name: state.lname || currentUserDetails.l_name || '',
          email: state.email || currentUserDetails.email || '',
        };

        await upsertUserDetails(user.id, updatedUserDetails, state.picture);
        const userDetails = await fetchUserDetails(user.id);
        setUserDetails(userDetails);
        dispatch({ type: 'clearState' });
      } catch (error) {
        console.error(error);
      }
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

            <p>Use PNG or JPG format.</p>
          </div>
        </label>
      </div>
      <div className="customize-body">
        <form className="link-input">
          <label className="profile-label">
            <p>First name</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. John"
              value={state.fname}
              onChange={(event) =>
                dispatch({ type: 'setFname', payload: event.target.value })
              }
            />
          </label>
          <label className="profile-label">
            <p>Last name</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. Appleseed"
              value={state.lname}
              onChange={(event) =>
                dispatch({ type: 'setLname', payload: event.target.value })
              }
            />
          </label>
          <label className="profile-label">
            <p>Email</p>
            <input
              type="text"
              className="element-input"
              placeholder={user?.email}
              value={state.email ?? 'e.g. johnappleseed.provider.com'}
              onChange={(event) =>
                dispatch({ type: 'setEmail', payload: event.target.value })
              }
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
