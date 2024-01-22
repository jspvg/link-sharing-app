import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/api/supabase';
import { useUser } from '../../hooks/useUser';

const LogoutPrompt = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user !== null) {
      const confirmLogout = window.confirm('Are you sure you want to log out?');
      if (confirmLogout) {
        supabase.auth.signOut().then(() => {
          console.log('user cofirmed logout');
          setUser(null);
          navigate('/register');
          console.log('should be rerouted');
        });
      } else {
        console.log('user denied logout');
        navigate('/landing');
      }
    }
  }, [navigate, user, setUser]);

  return null;
};

export default LogoutPrompt;
