import {
    createBrowserRouter
  } from "react-router-dom";
  import App from "./App";

import Login from "./Login";
import Intro from "./Intro";






const router = createBrowserRouter([

  {
    path: "/",
    element: <Intro/>
  },

    {
        path: "/Login",
        element: <Login/>
      },

    {
      path: "/App",
      element: <App/>,
    
    }

   
  ]);

  export default router;