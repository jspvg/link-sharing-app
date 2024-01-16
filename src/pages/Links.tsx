import CustomizeLinks from '../components/CustomizeLinks';
import MobileMockup from '../components/MobileMockup';
import useUserPlatforms from '../hooks/useUserPlatforms';

const Links = () => {
  const { userPlatforms, setUserPlatforms } = useUserPlatforms();

  return (
    <div className="page-body">
      <div className="page-container">
        <div className="left">
          <MobileMockup userPlatforms={userPlatforms} />
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
