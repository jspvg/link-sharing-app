import { useState, useEffect } from 'react';
import CustomizeLinks from '../components/CustomizeLinks';
import MobileMockup from '../components/MobileMockup';
import useUserPlatforms from '../hooks/useUserPlatforms';
import { fetchUserDetails } from '../lib/api/queries';
import { UserDetails } from '../lib/types';
import { useUser } from '../providers/UserProvider';

const Links = () => {
  const { user } = useUser();
  const { userPlatforms, setUserPlatforms } = useUserPlatforms();
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
            userDetails={userDetails}
          />
        </div>
        <div className="right">
          <CustomizeLinks
            userPlatforms={userPlatforms}
            setUserPlatforms={setUserPlatforms}
          />
        </div>
      </div>
    </div>
  );
};

export default Links;
