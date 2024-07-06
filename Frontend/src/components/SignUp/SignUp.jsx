import React, { useEffect, useState } from 'react';
import PhoneVerification from '../../pages/DemoDriveBooking/PhoneVerification';
import UserDetails from '../UserDetails/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setSignupStatus, selectSignupStatus, selectUser } from '../../features/user/userSlice';
import OTPVerification from '../../pages/DemoDriveBooking/OTPVerification';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-toastify';
import './SignUp.css'
function SignUp() {
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const signupStatus = useSelector(selectSignupStatus);
  const user = useSelector(selectUser);
  console.log('init state', user)

  useEffect(() => {
    const storedSignupStatus = localStorage.getItem('signupStatus');
    if (storedSignupStatus) {
      dispatch(setSignupStatus(JSON.parse(storedSignupStatus)));
    }
  }, [dispatch]);

  const handlePhoneVerificationSuccess = (userData) => {
    dispatch(setSignupStatus(true));
    dispatch(setUser(userData));
  };
  const customId = localStorage.getItem('customId');
  return (
    <div className='signup-container'>
      <h3 className='signup-container__h3'>Sign Up</h3>
      <div id="recaptcha-container"></div>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      {!otpVerified && <PhoneVerification
        phone={phone}
        setPhone={setPhone}
        setShowOtp={setShowOtp}
        loading={loading}
        setLoading={setLoading}
        otpSent={otpSent}
        setOtpSent={setOtpSent} />}

      {showOtp && !otpVerified && (
        <OTPVerification
          setOtpVerified={setOtpVerified}
          setOtpSent={setOtpSent}
        />
      )}
      {otpVerified && <UserDetails user={user} />}
    </div>
  );
}

export default SignUp;
