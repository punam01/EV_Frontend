import React from 'react';
import OtpInput from 'react-otp-input';
import { GoShieldLock } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";

const OtpVerification = ({ otp, setOtp, onOTPVerify, loading }) => {
  return (
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
  );
};

export default OtpVerification;
