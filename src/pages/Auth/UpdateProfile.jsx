import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';

const UpdateProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
    }
  }, [user]);

  const validateForm = (formData) => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Photo URL validation
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    if (formData.photo && !urlPattern.test(formData.photo)) {
      newErrors.photo = "Please enter a valid URL";
    }

    return newErrors;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      photo: form.photo.value,
    };

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      updateUser(formData.name, formData.photo)
        .catch(error => console.log(error));
    }
  };

  if (loading) {
    return <div className="text-center my-8">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center my-8">Please log in to update your profile.</div>;
  }

  return (
    <form onSubmit={handleUpdate}>
      <fieldset className="fieldset p-4 w-4/12 mx-auto my-8">
        <legend className="text-3xl font-bold text-center">Update Profile</legend>

        <label className="label">Name</label>
        <input
          defaultValue={user.displayName || ''}
          type="text"
          className="input w-full"
          placeholder="Name"
          name="name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

        <label className="label">Photo URL</label>
        <input
          defaultValue={user.photoURL || ''}
          type="url"
          className="input w-full"
          placeholder="Photo URL"
          name="photo"
        />
        {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}

        <button type="submit" className="btn btn-neutral my-4 btn-wide mx-auto">Update</button>
      </fieldset>
    </form>
  );
};

export default UpdateProfile;