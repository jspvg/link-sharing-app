import MobileMockup from "../components/MobileMockup";
import Navbar from "../components/Navbar";
import "../styles/components/preview.scss";

const Preview = () => {
  return (
    <div className="preview-body">
      <Navbar />
      <div className="negative-margin">
        <MobileMockup />
      </div>
    </div>
  );
};

export default Preview;
