import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/api/supabase';
import { useUser } from '../../hooks/useUser';

const LogoutPrompt = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleConfirmLogout = () => {
    supabase.auth.signOut().then(() => {
      console.log('user confirmed logout');
      setUser(null);
      navigate('/register');
      console.log('should be rerouted');
    });
  };

  const handleDenyLogout = () => {
    console.log('user denied logout');
    navigate('/landing');
  };

  useEffect(() => {
    if (user !== null) {
      setShowConfirmLogout(true);
    }
  }, [user]);

  return (
    <>
      {showConfirmLogout && (
        <section>
          <div className="logout-prompt">
            <p>Are you sure you want to log out?</p>
            <button className='button' onClick={handleConfirmLogout}>Yes</button>
            <button className='button'onClick={handleDenyLogout}>No</button>
          </div>
        </section>
      )}
    </>
  );
};

export default LogoutPrompt;
