import { ReactNode, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/api/supabase';
import { User } from '@supabase/supabase-js';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your preferred loading state
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
