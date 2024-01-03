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
      path: "/App",
      element: <App/>,
    
    },

    {
      path: "/Login",
      element: <Login/>,
    
    }

   
  ]);

  export default router;