import React, { useEffect, useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import PhoneNumberInput from './PhoneNumberInput';
import OtpVerification from './OtpVerification';
import { auth } from '../../firebase.config'
import UserProfilePage from '../../pages/UserProfile/UserProfilePage';
const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const auth = getAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptchaVisible, setRecaptchaVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user)); // Dispatch setUser action when user is authenticated
      } else {
        dispatch(setUser(null)); // Clear user when not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onLogin();
        }
      });
    }
  }

  function onLogin() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + phone;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
        toast.success("OTP sent successfully!");
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult.confirm(otp).then((res) => {
      dispatch(setUser(res.user));
      setLoading(false);
      setRecaptchaVisible(false);
      toast.success("Login successful!");
      navigate('/profile');
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  return (
    <>
      {user ? (<UserProfilePage />) : (<section className='login-container'>
        <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
        {recaptchaVisible && <div id="recaptcha-container"></div>}
        <div>
          <div className='welcome'>WELCOME BACK!</div>
          {showOtp ? (
            <OtpVerification otp={otp} setOtp={setOtp} onOTPVerify={onOTPVerify} loading={loading} />
          ) : (
            <PhoneNumberInput phone={phone} setPhone={setPhone} onLogin={onLogin} loading={loading} />
          )}
        </div>
      </section>)}
    </>
  );
}

export default Login;
