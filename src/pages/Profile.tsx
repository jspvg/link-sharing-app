import MobileMockup from '../components/MobileMockup';
import ProfileDetails from '../components/ProfileDetails';
import useUserPlatforms from '../hooks/useUserPlatforms';

const Profile = () => {
  const { userPlatforms } = useUserPlatforms();
  return (
    <div className="page-body">
      <div className="page-container">
        <div className="left">
          <MobileMockup userPlatforms={userPlatforms} />
        </div>
        <div className="right">
          <ProfileDetails />
        </div>
      </div>
    </div>
  );
};

export default Profile;
