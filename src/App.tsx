import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import Links from "./pages/Links";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import "./App.scss";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Links /> },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "Preview", element: <Preview /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
