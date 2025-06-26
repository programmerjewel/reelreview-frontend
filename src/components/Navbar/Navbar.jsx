import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import logo from '../../../src/assets/logo.png';
import { FiSun, FiMoon } from "react-icons/fi"; // Import icons

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  
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
        <Link to='/fan-review'>Fan Review</Link>
      </li>
      {user && (
        <li>
          <Link to="/favourites">My Favourites</Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="navbar shadow-sm sticky top-0 z-10 h-10 bg-base-100 dark:bg-gray-800">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {li}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost md:text-xl text-md p-1.5 md:p-4 text-blue-950 dark:text-white">
          <img src={logo} className="md:h-8 h-5" alt="Logo" />
          ReelReview
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{li}</ul>
      </div>

      <div className="navbar-end flex md:gap-4 gap-2 items-center">
        {/* Theme Toggle with Icons */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            className="hidden"
          />
          <FiSun className="swap-on w-5 h-5 text-yellow-500" />
          <FiMoon className="swap-off w-5 h-5 text-indigo-400" />
        </label>

        {user ? (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="Profile" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to='/update-profile' className="justify-between">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-primary  md:btn-md p-2 md:p-4">Log In</Link>
            <Link to="/register" className="btn border btn-sm md:btn-md p-2 md:p-4">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;