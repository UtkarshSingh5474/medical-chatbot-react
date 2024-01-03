
// import ReactDOM from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
// import './index.css'
// import router from './Router.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />,
// )

import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    {/* Your app's components go here */}
  </RouterProvider>
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

