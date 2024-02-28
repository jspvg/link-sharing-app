import { RouterProvider } from 'react-router-dom';
import { Router } from './routes';
import { UserProvider } from './providers/UserProvider';
import { UserDetailsProvider } from './providers/UserDetailsProvider';
import './styles/global.scss';

function App() {
  return (
    <>
      <UserProvider>
        <UserDetailsProvider>
          <RouterProvider router={Router} />
        </UserDetailsProvider>
      </UserProvider>
    </>
  );
}

export default App;
