import React, { useState, useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { registerUser } from '../../services/userServices';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../../features/user/userSlice';

const UserDetailsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    pincode: '',
    custom_id: user ? user.uid : '', // Access user details
    _id: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  console.log(user)
  useEffect(() => {
    if (user) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        custom_id: user.uid,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser({
        custom_id: user.uid,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email: userDetails.email,
        address: userDetails.address,
        pincode: userDetails.pincode,
        contact: user.phoneNumber, 
      });

      toast.success(response.msg);
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        _id: response._id,
      }));
      dispatch(setUser({
        ...user,
        userDetails: {
          ...userDetails,
          _id: response._id,
        }
      }));
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to register user:', error);
      toast.error(error.message || 'Failed to register user.');
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <section>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      <div>
        {submitted ? (
          <div>
            <h2>Registration Success!!</h2>
            <div>
              <p>
                <strong>UID_:</strong> {userDetails._id}
              </p>
              <p>
                <strong>UID:</strong> {user.uid}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Name:</strong> {userDetails.first_name} {userDetails.last_name}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Address:</strong> {userDetails.address}
              </p>
              <p>
                <strong>Pincode:</strong> {userDetails.pincode}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
            <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
            <button type="submit">
              {loading && <CgSpinner className="animate-spin" />}
              <span>Submit Details</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default UserDetailsForm;
