import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { GoShieldLock } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import { BsTelephoneFill } from "react-icons/bs";
import OtpInput from 'react-otp-input';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser, setSignupStatus } from '../../features/user/userSlice';
import { auth } from '../../firebase.config';

function PhoneVerification({ onSuccess }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          onSignup();
        }
      });
    }
  }

  function onSignup() {
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
        toast.error("Failed to send OTP. Please try again.");
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult.confirm(otp).then(async (res) => {
      setLoading(false);
      localStorage.setItem('customId',res.user.uid)
      dispatch(setUser({
        uid: res.user.uid,
        phoneNumber: res.user.phoneNumber,
      }));
      dispatch(setSignupStatus(true));
      onSuccess({
        uid: res.user.uid,
        phoneNumber: res.user.phoneNumber,
      });
    }).catch(err => {
      console.log(err);
      setLoading(false);
      toast.error("Failed to verify OTP. Please try again.");
    });
  }

  return (
    <section className='phone-verification-container'>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      <div id="recaptcha-container"></div>
      <div className='verify-container'>
        <div className='icon'>
          <BsTelephoneFill size={30} />
        </div>
        {showOtp ? (
          <div>
            <GoShieldLock size={30} />
            <label htmlFor='otp'>Enter your OTP</label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <button onClick={onOTPVerify} disabled={loading}>
              {loading && <CgSpinner className='animate-spin' />}
              <span>Verify OTP</span>
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor='phone-verification-container__title'>Verify your phone number</label>
            <PhoneInput
              country={'in'}
              value={phone}
              onChange={setPhone}
              id='phone'
            />
            <button className='phone-verification-container__btn' onClick={onSignup} disabled={loading} >
              {loading && <CgSpinner />}
              <span style={{backgroundColor:'pink'}}>Send code via SMS</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PhoneVerification;
