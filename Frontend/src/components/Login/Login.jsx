import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { GoShieldLock } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import { BsTelephoneFill } from "react-icons/bs";
import OtpInput from 'react-otp-input';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';

import { auth } from "../../firebase.config"

function Login() {
  const auth = getAuth();
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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
      toast.success("Login successful!");
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  return (
    <section className=''>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <div>
          <h2>Login Success!!</h2>
          <div>
            <p><strong>UID:</strong> {user.uid}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          </div>
        </div>
      ) : (
        <div>
          <div>WELCOME BACK!</div>
          {showOtp ? (
            <div>
              <div className=''>
                <GoShieldLock size={30} />
              </div>
              <label htmlFor='otp'>Enter your OTP</label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
              <button onClick={onOTPVerify}>
                {loading && <CgSpinner className='animate-spin' />}
                <span>Verify OTP</span>
              </button>
            </div>
          ) : (
            <div>
              <div className=''>
                <BsTelephoneFill size={30} />
              </div>
              <label htmlFor='phone'>Verify your phone number</label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                id='phone'
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

