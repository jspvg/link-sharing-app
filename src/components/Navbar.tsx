import { NavLink, useMatch } from "react-router-dom";
import Logo from "./Logo";
import "../styles/components/navigation.scss";

const Navbar = () => {
  const homeMatch = useMatch("/");
  const profileMatch = useMatch("/profile");
  return (
    <nav>
      <Logo />
      <div className="nav-div">
        <NavLink className={`nav-link ${homeMatch ? 'active' : ''}`} to="/">
          <img src={homeMatch ? "./src/assets/link-teal.svg" : "./src/assets/link-gray.svg"} />
          Links
        </NavLink>
        <NavLink className={`nav-link ${profileMatch ? 'active' : ''}`} to="/profile">
          <img src={profileMatch ? "./src/assets/profile-teal.svg" : "./src/assets/profile-gray.svg"} />
          Profile Details
        </NavLink>
      </div>
      <NavLink className="nav-link nav-preview" to="/preview">
        Preview
      </NavLink>
    </nav>
  );
};

export default Navbar;
