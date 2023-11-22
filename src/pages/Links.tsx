import MobileMockup from "../components/MobileMockup";
import Navbar from "../components/Navbar";

const Links = () => {
  return (
    <div className="links-page">
      <Navbar />
      <div className="links-div">
        <MobileMockup />
        <div className="mockup-div">Element two</div>
      </div>
    </div>
  );
};

export default Links;
