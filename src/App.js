import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './Routes/Routes';


const router = createBrowserRouter(routes,
  {
    basename: process.env.REACT_APP_BASE_PREFIX || '/', // Default to root if not set
  }
)
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>

  );
}

export default App;
