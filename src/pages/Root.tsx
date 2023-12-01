import { Outlet, useMatch } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileContextProvider from "../store/ProfileContext";

export default function Root() {
  const homeMatch = useMatch("/");
  const profileMatch = useMatch("/profile");
  const previewMatch = useMatch("/preview");
  return (
    <ProfileContextProvider>
      <div className={previewMatch ? "no-padding" : "padding"}>
        {homeMatch || profileMatch ? <Navbar /> : <></>}
        <Outlet />
      </div>
    </ProfileContextProvider>
  );
}
