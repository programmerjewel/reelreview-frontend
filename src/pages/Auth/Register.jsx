import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Toggle show/hide password
  const toggleVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = (formData) => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Photo URL validation
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    if (formData.photourl && !urlPattern.test(formData.photourl)) {
      newErrors.photourl = "Please enter a valid URL";
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    }

    // Confirm password validation
    if (formData.password !== formData.conpassword) {
      newErrors.conpassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleUserRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      conpassword: form.conpassword.value,
      photourl: form.photourl.value,
    };

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      createUser(formData.email, formData.password)
        .then(() => {
          updateUser(formData.name, formData.photourl);
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <main className="flex justify-center">
      <form className="fieldset w-xs p-4" onSubmit={handleUserRegister}>
        <legend className="text-center text-3xl font-semibold">Register</legend>

        <label className="label">Name</label>
        <input type="text" className="input" placeholder="name" name='name' />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

        <label className="label">Image URL</label>
        <input type="url" className="input" placeholder="image url" name='photourl' />
        {errors.photourl && <p className="text-red-500 text-sm mt-1">{errors.photourl}</p>}

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="email" name='email'/>
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        <label className="label">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="input w-full"
            placeholder="password"
            name="password"
          />
          <button
            type="button"
            className="z-3 absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => toggleVisibility('password')}
          >
            {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

        <label className="label">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            className="input w-full"
            placeholder="confirm password"
            name="conpassword"
          />
          <button
            type="button"
            className="z-3 absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => toggleVisibility('confirm')}
          >
            {showConfirmPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        </div>
        {errors.conpassword && <p className="text-red-500 text-sm mt-1">{errors.conpassword}</p>}

        <button className="btn btn-neutral mt-4">Register</button>
        <p className="text-md">Already have an account? Please <Link className='font-medium underline' to='/login'>Log In</Link> here.</p>
      </form>
    </main>
  );
};

export default Register;