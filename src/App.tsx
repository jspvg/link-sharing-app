import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { Router } from './routes';
import { UserProvider } from './providers/UserProvider';

function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={Router} />
      </UserProvider>
    </>
  );
}

export default App;
