import { useEffect } from 'react';
import CustomizeLinks from '../components/CustomizeLinks';
import MobileMockup from '../components/MobileMockup';
import { fetchUserDetails } from '../lib/api/queries';
import { useUser } from '../hooks/useUser';
import { useUserDetails } from '../hooks/useUserDetails';

const Links = () => {
  const { user } = useUser();
  const { setUserDetails } = useUserDetails();

  useEffect(() => {
    if (user) {
      fetchUserDetails(user.id).then(setUserDetails).catch(console.error);
    }
  }, [setUserDetails, user]);

  return (
    <div className="page-body">
      <div className="page-container">
        <div className="left">
          <MobileMockup />
        </div>
        <div className="right">
          <CustomizeLinks />
        </div>
      </div>
    </div>
  );
};

export default Links;
