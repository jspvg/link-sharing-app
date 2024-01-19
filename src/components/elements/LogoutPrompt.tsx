import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/api/supabase';
import { useUser } from '../../providers/UserProvider';

const LogoutPrompt = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user !== null) {
      const confirmLogout = window.confirm('Are you sure you want to log out?');
      if (confirmLogout) {
        supabase.auth.signOut().then(() => {
          navigate('/register');
        });
      } else {
        navigate('/landing');
      }
    }
  }, [navigate, user]);

  return null;
};

export default LogoutPrompt;
