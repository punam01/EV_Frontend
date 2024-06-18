// Login.jsx
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { GoShieldLock } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import { BsTelephoneFill } from "react-icons/bs";
import OtpInput from 'react-otp-input';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {auth} from '../../firebase.config'
import { useUser } from '../../contexts/UserContext'

function Login() {
  const auth = getAuth();
  const { setUserId } = useUser();
  const navigate = useNavigate(); 
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [recaptchaVisible, setRecaptchaVisible] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('userId', user.uid);
        console.log('login',localStorage.getItem('userId'))
        setUserId(user.uid); 
      } else {
        localStorage.removeItem('userId');
        setUserId(null); 
      }
    });

    return () => unsubscribe();
  }, [auth, setUserId]);

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
      setUser(res.user);
      setLoading(false);
      setRecaptchaVisible(false); 
      toast.success("Login successful!");
      navigate('/profile'); 
      setLoading(false)
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  return (
    <section className='login-container'>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      {recaptchaVisible && <div id="recaptcha-container"></div>} 
      {user ? (
        loading && <div>Loading...</div>
      ) : (
        <div>
          <div className='welcome'>WELCOME BACK!</div>
          {showOtp ? (
            <div className='verify-container'>
              <div className='icon'>
                <GoShieldLock size={30} />
              </div>
              <label htmlFor='otp'>Enter your OTP</label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                className="otp-container"
              />
              <button onClick={onOTPVerify}>
                {loading && <CgSpinner className='animate-spin' />}
                <span>Verify OTP</span>
              </button>
            </div>
          ) : (
            <div className='verify-container'>
              <div className='icon'>
                <BsTelephoneFill size={30} />
              </div>
              <label className="label-text" htmlFor='phone'>Verify your phone number</label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                id='phone'
                className="phone-input"
              />
              <button onClick={onLogin}>
                {loading && <CgSpinner className='animate-spin' />}
                <span>Send code via SMS</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Login;
