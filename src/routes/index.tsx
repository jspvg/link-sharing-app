import { createBrowserRouter } from 'react-router-dom';
import AuthWrapper from '../components/wrappers/AuthWrapper';
import Register from '../pages/Register';
import PageNotFound from '../pages/404';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Root from '../pages/Root';
import LogoutPrompt from '../components/elements/LogoutPrompt';
import ProtectedRoute from '../components/wrappers/ProtectedRoute';
import Links from '../pages/Links';
import Preview from '../pages/Preview';
import Profile from '../pages/Profile';

export const Router = createBrowserRouter([
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
      {
        path: 'login',
        element: (
          <AuthWrapper>
            <Login />
          </AuthWrapper>
        ),
      },
      {
        path: 'register',
        element: (
          <AuthWrapper>
            <Register />
          </AuthWrapper>
        ),
      },
      {
        path: 'preview/:userId',
        element: <Preview />,
      },
      {
        path: 'logout',
        element: (
          <ProtectedRoute>
            <LogoutPrompt />
          </ProtectedRoute>
        ),
      },
      {
        path: 'landing',
        element: <Landing />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);
