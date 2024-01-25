import MobileMockup from '../components/MobileMockup';
import ProfileDetails from '../components/ProfileDetails';
const Profile = () => {
  return (
    <div className="page-body">
      <div className="page-container">
        <div className="left">
          <MobileMockup />
        </div>
        <div className="right">
          <ProfileDetails />
        </div>
      </div>
    </div>
  );
};

export default Profile;
