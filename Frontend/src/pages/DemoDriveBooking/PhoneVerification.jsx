import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { CgSpinner } from "react-icons/cg";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from 'react-hot-toast';
import { auth } from '../../firebase.config';
import './PhoneVerification.css'


const PhoneVerification = ({ phone, setPhone, setShowOtp, loading, setLoading, otpSent ,setOtpSent}) => {
    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: (response) => {
                    onSignup();
                }
            });
        }
    };

    const onSignup = () => {
        setLoading(true);
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = '+' + phone;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOtp(true);
                setOtpSent(true); 
                toast.success("OTP sent successfully!");
                
            }).catch((error) => {
                console.log(error);
                setLoading(false);
                toast.error("Failed to send OTP. Please try again.");
            });
            setLoading(false)
    };


    return (
        <div className="phone-verification-container">
            <label className="phone-verification-container__title" htmlFor='phone'>Verify your phone number</label>
            <PhoneInput
                className="phoneInput"
                country={'in'}
                value={phone}
                onChange={setPhone}
                id='phone'
                disabled={otpSent}
            />
            <p className='phone-verification-container__note'><span>Note:</span> Please use your active Phone number.</p>
            {!otpSent && (
                <button className="phone-verification-container__btn" onClick={onSignup} disabled={loading}>
                    {loading && <CgSpinner className='animate-spin' />}
                    <span>Send code via SMS</span>
                </button>
            )}
        </div>
    );
};

export default PhoneVerification;
