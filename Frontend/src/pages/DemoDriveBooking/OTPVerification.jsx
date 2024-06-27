import React, { useState } from 'react';
import { GoShieldLock } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser, setSignupStatus } from '../../features/user/userSlice';

const OTPVerification = ({ setOtpVerified, setOtpSent }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onOTPVerify = () => {
        setLoading(true);
        window.confirmationResult.confirm(otp).then(async (res) => {
            setLoading(false);
            setOtpVerified(true);
            setOtpSent(true);
            localStorage.setItem('customId', res.user.uid)
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
    );
};

export default OTPVerification;
