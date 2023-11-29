import { NavLink, useMatch } from "react-router-dom";
import Logo from "./Logo";
import "../styles/components/navigation.scss";

const Navbar = () => {
  const homeMatch = useMatch("/");
  const profileMatch = useMatch("/profile");
  const previewMatch = useMatch("/preview");
  return (
    <nav>
      {homeMatch || profileMatch ? (
        <>
          <Logo />
          <div className="nav-div">
            <NavLink className={`nav-link ${homeMatch ? "active" : ""}`} to="/">
              <img
                src={
                  homeMatch
                    ? "./src/assets/link-teal.svg"
                    : "./src/assets/link-gray.svg"
                }
              />
              Links
            </NavLink>
            <NavLink
              className={`nav-link ${profileMatch ? "active" : ""}`}
              to="/profile"
            >
              <img
                src={
                  profileMatch
                    ? "./src/assets/profile-teal.svg"
                    : "./src/assets/profile-gray.svg"
                }
              />
              Profile Details
            </NavLink>
          </div>
          <NavLink className="nav-link nav-preview" to="/preview">
            Preview
          </NavLink>
        </>
      ) : previewMatch ? (
        <div className="nav-div-preview">
          <NavLink to="/" className="nav-link nav-preview">
            Back to Editor
          </NavLink>
          <button className="share-button">Share Link</button>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
