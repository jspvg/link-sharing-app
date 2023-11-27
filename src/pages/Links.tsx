import CustomizeLinks from "../components/CustomizeLinks";
import MobileMockup from "../components/MobileMockup";
import "../styles/components/forms.scss";

const Links = () => {
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
