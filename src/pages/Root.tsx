import { Outlet, useMatch } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  const homeMatch = useMatch("/");
  const profileMatch = useMatch("/profile");
  return (
    <>
      {(homeMatch || profileMatch) ? <Navbar /> : <></>}
      <Outlet />
    </>
  );
}
