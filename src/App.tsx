import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './pages/Root';
import Links from './pages/Links';
import Login from './pages/Login';
import Preview from './pages/Preview';
import Profile from './pages/Profile';
import Register from './pages/Register';
import './App.scss';
import ProtectedRoute from './components/wrappers/ProtectedRoute';
import LogoutPrompt from './components/elements/LogoutPrompt';
import AuthWrapper from './components/wrappers/AuthWrapper';
import PageNotFound from './pages/404';
import Landing from './pages/Landing';

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
        path: 'Preview',
        element: (
          <ProtectedRoute>
            <Preview />
          </ProtectedRoute>
        ),
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

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
