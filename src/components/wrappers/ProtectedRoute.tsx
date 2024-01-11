import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>; // Or your preferred loading state
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
