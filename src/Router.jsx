import {
    createBrowserRouter
  } from "react-router-dom";
  import App from "./App";

import Login from "./Login";






const router = createBrowserRouter([



    {
        path: "/",
        element: <Login/>
      },

    {
      path: "/App",
      element: <App/>,
    
    }

   
  ]);

  export default router;