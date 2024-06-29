import React, { useState } from 'react';
import { GoShieldLock } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser, setSignupStatus } from '../../features/user/userSlice';
import './OTPVerification.css'

const OTPVerification = ({ setOtpVerified, setOtpSent }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const onOTPVerify = () => {
        setLoading(true);
        console.log('verifying')
        window.confirmationResult.confirm(otp).then(async (res) => {
            setLoading(false);
            setOtpVerified(true);
            setOtpSent(true);
            console.log('setting userid:', res.user.uid)
            localStorage.setItem('customId', res.user.uid)
            localStorage.setItem('phone', res.user.phoneNumber)
            dispatch(setUser({
                uid: res.user.uid,
                phoneNumber: res.user.phoneNumber,
            }));
            dispatch(setSignupStatus(true));
            toast.success("OTP verified successfully!");
        }).catch(err => {
            console.log(err);
            setLoading(false);
            toast.error("Failed to verify OTP. Please try again.");
        });
    };

    return (
        <div className='otp-verification-container'>
            <label className="otp-verification-container__title" htmlFor='otp'>Enter your OTP</label>
            <OtpInput
                className="otp-verification-container__holder"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="otp-separator">-</span>}
                renderInput={(props) => <input {...props} />}
            />
            <button className="otp-verification-container__btn" onClick={onOTPVerify} disabled={loading}>
                {loading && <CgSpinner className='animate-spin' />}
                <span>Verify OTP</span>
            </button>
        </div>
    );
};

export default OTPVerification;
