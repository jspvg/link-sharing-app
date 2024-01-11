import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './pages/Root';
import Links from './pages/Links';
import Login from './pages/Login';
import Preview from './pages/Preview';
import Profile from './pages/Profile';
import Register from './pages/Register';
import './App.scss';
import ProtectedRoute from './components/wrappers/ProtectedRoute';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Links />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'Preview',
        element: (
          <ProtectedRoute>
            <Preview />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
