import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import ErrorPage from '../pages/ErrorPage'
import HomePage from "../pages/HomePage";
import AllMovies from "../pages/AllMovies";
import MovieDetail from "../pages/MovieDetail";
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
        path: '/movies',
        element: <AllMovies/>
      },
      {
        path: '/movies/:id',
        element: <MovieDetail/>,
      }
    ]
  }
])

export default router;