import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import '../styles/components/navigation.scss';
import { supabase } from '../lib/api/supabase';
import { useUser } from '../hooks/useUser';
import NavLinkItem from './elements/NavLinkItem';

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Error logging out:', error.message);
    } else {
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <nav>
      <>
        <Logo />
        <div className="nav-div">
          <NavLinkItem
            to="/"
            alt="link"
            src={{ active: '/link-teal.svg', inactive: '/link-gray.svg' }}
            text="Links"
          />
          <NavLinkItem
            to="/profile"
            alt="profile"
            src={{ active: '/profile-teal.svg', inactive: '/profile-gray.svg' }}
            text="Profile Details"
          />
        </div>
        <div className="nav-div">
          {user && (
            <NavLinkItem
              to={`/preview/${user.id}`}
              alt="eye"
              src={{
                inactive: '/preview-gray.svg',
              }}
              text="Preview"
            />
          )}

          <button className="nav-link" onClick={logoutUser} id="logout">
            <img src="/logout.svg" alt="logout" />
            <p>Logout</p>
          </button>
        </div>
      </>
    </nav>
  );
};

export default Navbar;
