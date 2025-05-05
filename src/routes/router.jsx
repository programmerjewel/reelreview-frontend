import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import ErrorPage from '../pages/ErrorPage'
import HomePage from "../pages/HomePage";
import AllMovies from "../pages/AllMovies";
import MovieDetail from "../pages/MovieDetail";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UpdateProfile from "../pages/Auth/UpdateProfile";
import FavouriteMovies from "../pages/FavouriteMovies";
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
        path: '/addmovie',
        element: <AddMovie/>
      },
      {
        path: '/movies/:id',
        element: <MovieDetail/>,
      },
      {
        path: '/login',
        element:<Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/favourites',
        element: <FavouriteMovies/>,
      },
      {
        path: '/update-profile',
        element: <UpdateProfile/>
      },
    ]
  }
])

export default router;