import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const  {isDark, toggleTheme} = useContext(ThemeContext);
  console.log(user);
  const handleLogout = () => {
    logoutUser();
  };
  const li = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/movies">All Movies</Link>
      </li>
      <li>
        <Link to="/addmovie">Add Movie</Link>
      </li>
      <li>
        <Link to="/favourites">My Favourites</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {li}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          ReelReview
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{li}</ul>
      </div>

      <div className="navbar-end flex gap-4">
      <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700" >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    {
      user ? (
        <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to='/update-profile' className="justify-between" >
                   Update Profile
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>

      ) : (<><Link to="/login" className="btn">Log In</Link><Link to="/register" className="btn btn-primary">Register</Link></> 
      )
    }
      </div>
    </nav>
  );
};

export default Navbar;
