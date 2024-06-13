import { useEffect, useState } from 'react';
import { CgSpinner } from "react-icons/cg";

import axios from "../../services/axiosInstance"; 
import toast, { Toaster } from 'react-hot-toast';


function UserDetailsForm({ user }) {
  console.log(user)
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    pincode: '',
    custom_id:''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const customId = localStorage.getItem('customId'); 
    if (customId) {
      setUserDetails(prevDetails => ({
        ...prevDetails,
        custom_id: customId
      }));
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
  
    
    const { custom_id, first_name, last_name, email, address, pincode } = userDetails;
    console.log(custom_id,first_name,last_name,email,address,pincode)
    try {
      await axios.post('/api/user', {
        custom_id: userDetails.custom_id,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email: userDetails.email,
        address: userDetails.address,
        pincode: userDetails.pincode,
        contact: user.phoneNumber 
      });

      toast.success("User registered successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to register user:', error);
      toast.error("Failed to register user.");
    }

    setLoading(false);
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <section className=''>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      <div>
        {submitted ? (
          <div>
            <h2>Registration Success!!</h2>
            <div>
              <p><strong>UID:</strong> {user.uid}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
              <p><strong>Name:</strong> {userDetails.first_name} {userDetails.last_name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
              <p><strong>Pincode:</strong> {userDetails.pincode}</p>
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
              {loading && <CgSpinner className='animate-spin' />}
              <span>Submit Details</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default UserDetailsForm;
