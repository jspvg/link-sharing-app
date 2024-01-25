import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { Router } from './routes';
import { UserProvider } from './providers/UserProvider';
import { UserDetailsProvider } from './providers/UserDetailsProvider';

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
