import { Outlet, useMatch } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Root() {
  const homeMatch = useMatch('/');
  const profileMatch = useMatch('/profile');
  const previewMatch = useMatch('/preview');
  const landingMatch = useMatch('/landing');
  return (
    <div className={previewMatch || landingMatch ? 'no-padding' : 'padding'}>
      {homeMatch || profileMatch ? <Navbar /> : <></>}
      <Outlet />
    </div>
  );
}
