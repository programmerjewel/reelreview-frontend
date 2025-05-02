import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import ErrorPage from '../pages/ErrorPage'
import HomePage from "../pages/HomePage";
import AllMovies from "../pages/AllMovies";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/allmovies',
        element: <AllMovies/>
      }
    ]
  }
])

export default router;