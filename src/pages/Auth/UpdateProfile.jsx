import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const UpdateProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Set form values when user data is available
  useEffect(() => {
    if (user) {
      setValue('name', user.displayName || '');
      setValue('photo', user.photoURL || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUser(data.name, data.photo);
      navigate('/'); // Navigate to home page after successful update
    } catch (error) {
      console.error('Update failed:', error);
      // Optionally show error message to user
    }
  };

  if (!user) {
    return <div className="text-center my-8">Please log in to update your profile.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fieldset p-4 w-4/12 mx-auto my-8">
      <legend className="text-3xl font-bold text-center">Update Profile</legend>

      <div className="mb-4">
        <label className="label">Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
          className="input w-full"
          placeholder="Name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="label">Photo URL</label>
        <input
          {...register('photo', {
            validate: (value) => {
              if (!value) return true; // Optional field
              const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
              return urlPattern.test(value) || 'Please enter a valid URL';
            }
          })}
          type="url"
          className="input w-full"
          placeholder="Photo URL"
        />
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-neutral my-4 btn-wide mx-auto"
      >
        {isSubmitting ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
};

export default UpdateProfile;