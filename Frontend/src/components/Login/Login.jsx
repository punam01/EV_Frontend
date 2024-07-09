import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../features/user/userSlice';
import UserProfilePage from '../../pages/UserProfile/UserProfilePage';
import PhoneVerification from '../../pages/DemoDriveBooking/PhoneVerification';
import OTPVerification from '../../pages/DemoDriveBooking/OTPVerification';
import { getUserByCustomId } from '../../services/userServices';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log(user)
  const authInstance = getAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [authInstance, dispatch]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(authInstance, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onLogin();
        }
      });
    }
  }

  const getUser = async (id) => {
    const res = await getUserByCustomId(id);
    if (res && res.data) {
      const userData = res.data;
      dispatch(setUser(userData));
      localStorage.setItem('USER',userData._id)
      localStorage.setItem('name',userData.first_name)
      localStorage.setItem('last_name',userData.last_name)
      localStorage.setItem('email',userData.email)
      localStorage.setItem('phone',userData.contact)
      localStorage.setItem('zip',userData.pincode)
      localStorage.setItem('address',userData.address)
    }
  };
  function onLogin() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + phone;
    signInWithPhoneNumber(authInstance, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        const user = authInstance.currentUser;
      if (user && user.uid) {
        getUser(user.uid)
          .then(() => {
            toast.success("OTP sent successfully!");
            navigate('/profile');
          })
          .catch((error) => {
            console.error('Error getting user data:', error);
          });
      }
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }


  return (
    <>
      {!user ? (<UserProfilePage />) :
        (
          <div className='login-container'>
            <h3 className='login-container__h3'>Login</h3>
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
            <div className="login-container__goto_signup">
              <span>New here?</span>
              <Link className="login-container__signup-link" to='/signup'>Create an account</Link>
            </div>
          </div>
        )}
    </>
  );
}

export default Login;
