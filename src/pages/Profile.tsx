import { useEffect, useState } from 'react';
import MobileMockup from '../components/MobileMockup';
import ProfileDetails from '../components/ProfileDetails';
import useUserPlatforms from '../hooks/useUserPlatforms';
import { UserDetails } from '../lib/types';
import { fetchUserDetails } from '../lib/api/queries';
import { useUser } from '../hooks/useUser';

const Profile = () => {
  const { userPlatforms } = useUserPlatforms();
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserDetails(user.id).then(setUserDetails).catch(console.error);
    }
  }, [user]);
  return (
    <div className="page-body">
      <div className="page-container">
        <div className="left">
          <MobileMockup
            userPlatforms={userPlatforms}
            userDetails={
              userDetails && {
                ...userDetails,
                profile_picture: `${userDetails!.profile_picture}?${Date.now()}`,
              }
            }
          />
        </div>
        <div className="right">
          <ProfileDetails setUserDetails={setUserDetails} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
