import { upsertUserDetails } from '../lib/api/mutations';
import { useUser } from '../hooks/useUser';
import { fetchUserDetails } from '../lib/api/queries';
import { useUserDetails } from '../hooks/useUserDetails';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../lib/validation/profileDetailsSchema';

const FileType = ['image/jpeg', 'image/jpg', 'image/png'];

const ProfileDetails = () => {
  const { user } = useUser();
  const { setUserDetails, state, dispatch } = useUserDetails();
  const [wrongTypeError, setWrongTypeError] = useState('');

  const defaultFormValues = {
    fname: '',
    lname: '',
    email: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
    defaultValues: defaultFormValues,
  });

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedPicture = event.target.files[0];
      const fileType = uploadedPicture.type;

      if (!Object.values(FileType).includes(fileType)) {
        setWrongTypeError('Please upload a PNG, JPG, or JPEG file');
        dispatch({ type: 'setPicture', payload: null });
        return;
      }

      setWrongTypeError('');
      dispatch({ type: 'setPicture', payload: uploadedPicture });
    }
  };

  const handleSaveDetails = handleSubmit(async (data) => {
    if (user) {
      try {
        const currentUserDetails = (await fetchUserDetails(user.id)) || {};

        const updatedUserDetails = {
          ...currentUserDetails,
          f_name: data.fname || currentUserDetails.f_name || '',
          l_name: data.lname || currentUserDetails.l_name || '',
          email: data.email || currentUserDetails.email || '',
        };

        await upsertUserDetails(user.id, updatedUserDetails, state.picture);
        const userDetails = await fetchUserDetails(user.id);
        setUserDetails(userDetails);
        dispatch({ type: 'clearState' });

        reset(defaultFormValues);
      } catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <>
      <div className="customize-header">
        <h1>Profile details</h1>
        <p className="header-p">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <div className="link-input">
        <label className="profile-label">
          <p>Profile picture</p>
          <div>
            <input
              className="nav-link active"
              type="file"
              onChange={(event) => handleAddImage(event)}
            />

            <p>Use PNG or JPG format.</p>
          </div>
        </label>
        {wrongTypeError && <p className="error">{wrongTypeError}</p>}
      </div>
      <div className="customize-body">
        <form className="link-input">
          <label className="profile-label">
            <p>First name</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. John"
              {...register('fname')}
            />
          </label>
          {errors.fname?.message && (
            <p className="error">{errors.fname.message as string}</p>
          )}
          <label className="profile-label">
            <p>Last name</p>
            <input
              type="text"
              className="element-input"
              placeholder="e.g. Appleseed"
              {...register('lname')}
            />
          </label>
          {errors.lname?.message && (
            <p className="error">{errors.lname.message as string}</p>
          )}
          <label className="profile-label">
            <p>Email</p>
            <input
              type="text"
              className="element-input"
              placeholder={user?.email}
              {...register('email')}
            />
          </label>
          {errors.email?.message && (
            <p className="error">{errors.email.message as string}</p>
          )}
        </form>
      </div>

      <div className="save-button">
        <button className="button" onClick={handleSaveDetails}>
          Save
        </button>
      </div>
    </>
  );
};

export default ProfileDetails;
