const MobileMockup = () => {
  return (
    <div className="mockup-div">
      <div className="mobile-outline">
        <div className="mobile-inline">
          <div className="mobile-header">
            <div className="circle"></div>
            <div className="name"></div>
            <div className="contact"></div>
          </div>
          <div className="mobile-content">
            {/*TODO map trough available links */}
            <div className="link-element"></div>
            <div className="link-element"></div>
            <div className="link-element"></div>
            <div className="link-element"></div>
            <div className="link-element"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMockup;
