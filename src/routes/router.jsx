import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import ErrorPage from '../pages/ErrorPage'
import HomePage from "../pages/HomePage";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path: '/',
        element: <HomePage/>
      }
    ]
  }
])

export default router;