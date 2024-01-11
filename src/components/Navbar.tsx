import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import '../styles/components/navigation.scss';
import { supabase } from '../lib/api/supabase';

const Navbar = () => {
  const homeMatch = useMatch('/');
  const profileMatch = useMatch('/profile');
  const navigate = useNavigate();

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Error logging out:', error.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <nav>
      <>
        <Logo />
        <div className="nav-div">
          <NavLink className={`nav-link ${homeMatch ? 'active' : ''}`} to="/">
            <img
              src={
                homeMatch
                  ? './src/assets/link-teal.svg'
                  : './src/assets/link-gray.svg'
              }
            />
            Links
          </NavLink>
          <NavLink
            className={`nav-link ${profileMatch ? 'active' : ''}`}
            to="/profile"
          >
            <img
              src={
                profileMatch
                  ? './src/assets/profile-teal.svg'
                  : './src/assets/profile-gray.svg'
              }
            />
            Profile Details
          </NavLink>
        </div>
        <div className='nav-div'>
          <NavLink className="nav-link nav-preview" to="/preview">
            Preview
          </NavLink>
          <button
            className="nav-link nav-preview"
            style={{ height: '75%' }}
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </>
    </nav>
  );
};

export default Navbar;
