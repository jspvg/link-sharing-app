import MobileMockup from "../components/MobileMockup";
import Navbar from "../components/Navbar";
import ProfileDetails from "../components/ProfileDetails";

const Profile = () => {
  return (
    <div className="links-page">
      <Navbar />
      <div className="links-div">
        <MobileMockup />
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Profile;
