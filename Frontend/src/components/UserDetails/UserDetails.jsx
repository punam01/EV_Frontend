import React, { useState, useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { registerUser } from '../../services/userServices';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../../features/user/userSlice';
import './UserDetails.css'
import { useNavigate } from 'react-router-dom';
const UserDetailsForm = ({user}) => {
  const navigate=useNavigate();
  
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);



  useEffect(() => {
    if (user) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(userDetails.pincode)) {
        toast.error('Pincode must be a 6-digit number.');
        setLoading(false);
        return;
    }
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

      console.log('Response from server:', response);

      toast.success(response.msg);
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        _id: response._id,
      }));

      dispatch(setUser({
        uid: user.uid,
        _id: response._id,
        userDetails: {
          ...userDetails,
          _id: response._id,
        },
        phoneNumber: user.phoneNumber,
      }));
      setSubmitted(true);
      navigate('/profile')
    } catch (error) {
      console.error('Failed to register user:', error);
      toast.error(error.message || 'Failed to register user.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  
  console.log('Current user data:', user);
  localStorage.setItem('USER',user._id)
  localStorage.setItem('customId',user.uid)
  localStorage.setItem('phone',user.phoneNumber)
  localStorage.setItem('name',userDetails.first_name)
  localStorage.setItem('email',userDetails.email)
  localStorage.setItem('last_name',userDetails.last_name)
  localStorage.setItem('zip',userDetails.pincode)
  localStorage.setItem('address',userDetails.address)

  return (
    <section className='user-deatils-container'>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      <div>
        {/*submitted ? (
          <div>
            <h2>Registration Success!!</h2>
            <div>
              <p>
                <strong>UID_:</strong> {user._id}
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
        ) : */
          <form onSubmit={handleSubmit}>
            <div className="user-details-container__input-container">
              <label className="user-details-container__input__label" htmlFor="phone">Contact</label>
              <input className="user-details-container__input_data" type="text" name="phone" placeholder={user.phoneNumber}/>
            </div>
            <div className="user-details-container__input-container">
              <label className="user-details-container__input__label" htmlFor="first_name">First name</label>
              <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            </div>
            <div className="user-details-container__input-container">
              <label className="user-details-container__input__label" htmlFor="last_name">Last name</label>
              <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <div className="user-details-container__input-container">
              <label className="user-details-container__input__label" htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="user-details-container__input-container">
              <label className="user-details-container__input__label" htmlFor="address">Address</label>
              <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
            </div>
            <div className="user-details-container__input-container">
              <label className="user-details-container__input__label" htmlFor="pincode">Pincode</label>
              <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
            </div>
            
            <button className="user-details-container__btn" type="submit">
              {loading && <CgSpinner className="animate-spin" />}
              <span>Submit Details</span>
            </button>
          </form>
      }
      </div>
    </section>
  );
};

export default UserDetailsForm;
