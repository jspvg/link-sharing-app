import CustomizeLinks from "../components/CustomizeLinks";
import MobileMockup from "../components/MobileMockup";
import Navbar from "../components/Navbar";

const Links = () => {
  return (
    <div className="links-page">
      <Navbar />
      <div className="links-div">
        <MobileMockup />
        <CustomizeLinks />
      </div>
    </div>
  );
};

export default Links;
