import { useContext } from "react"; // Changed from createContext
import { Link, useNavigate, useLocation } from "react-router-dom";
import googleIcon from '../../assets/Google-logo.svg';
import AuthContext from "../../context/AuthContext";

const Login = () => {
  // Correct way to consume context
  const { logInWithGoogle, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    // Call the loginUser function from context
    loginUser(email, password)
      .then(() => {
        console.log('Successfully logged in with email/password!');
        navigate(location.state?.from || '/');
        // You might want to redirect here
      })
      .catch(error => {
        console.error('Login error:', error.message);
      });
  };

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then(() => {
        console.log('Successfully logged in with Google!');
        navigate(location.state?.from || '/');
      })
      .catch(error => {
        console.error('Google login error:', error.message);
      });
  };

  return (
    <form onSubmit={handleLogin}> {/* Added onSubmit handler */}
      <fieldset className="fieldset p-4 w-4/12 mx-auto my-8">
        <legend className="text-3xl font-bold text-center">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" name="email" required />

        <label className="label">Password</label>
        <input type="password" className="input w-full" placeholder="Password" name="password" required />

        <button type="submit" className="btn btn-neutral my-4 btn-wide mx-auto">Login</button>
        
        {/* Added onClick handler and type="button" */}
        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          className="btn btn-neutral btn-wide mx-auto"
        >
          <img src={googleIcon} className="w-5 aspect-square" alt="" />
          Login with Google
        </button>
        
        <p className="text-center text-md mt-3 text-md">
          Don't have an account?{" "}
          <Link
            className="font-semibold text-md hover:underline"
            to="/register"
          >
            Register
          </Link>{" "}
          here
        </p>
      </fieldset>
    </form>
  );
};

export default Login;