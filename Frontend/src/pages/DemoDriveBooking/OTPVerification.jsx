import React, { useEffect, useState } from 'react';
import { CgSpinner } from "react-icons/cg";
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser, setSignupStatus } from '../../features/user/userSlice';
import './OTPVerification.css'
import { getUserByCustomId } from '../../services/userServices';

const OTPVerification = ({ setOtpVerified, setOtpSent }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [userProfile,setUserProfile]=useState({})
    const dispatch = useDispatch();

    const fetchUserProfile = async (customId) => {
        try {
          const response = await getUserByCustomId(customId);
          setUserProfile({
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            contact: response.contact,
            address: response.address,
            pincode: response.pincode,
            custom_id: customId
          });
          console.log('storing iun local.......')
          localStorage.setItem('USER', response._id)
          //localStorage.setItem('customId', user.uid)
          //localStorage.setItem('phone', user.phoneNumber)
          localStorage.setItem('name', response.first_name)
          localStorage.setItem('email', response.email)
          localStorage.setItem('last_name', response.last_name)
          localStorage.setItem('zip', response.pincode)
          localStorage.setItem('address', response.address)
          console.log("response", response);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      
    
    const onOTPVerify = () => {
        setLoading(true);
        //console.log('verifying')
        window.confirmationResult.confirm(otp).then(async (res) => {
            setLoading(false);
            setOtpVerified(true);
            setOtpSent(true);
            //console.log('setting userid:', res.user.uid)
            localStorage.setItem('customId', res.user.uid)
            localStorage.setItem('phone', res.user.phoneNumber)
            fetchUserProfile(res.user.uid);
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
                className="otpInput"
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
