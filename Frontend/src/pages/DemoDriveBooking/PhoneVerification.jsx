import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CgSpinner } from "react-icons/cg";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from 'react-hot-toast';
import { auth } from '../../firebase.config';

const PhoneVerification = ({ phone, setPhone, setShowOtp, loading, setLoading, otpSent }) => {
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
                toast.success("OTP sent successfully!");
            }).catch((error) => {
                console.log(error);
                setLoading(false);
                toast.error("Failed to send OTP. Please try again.");
            });
    };

    return (
        <div className="contact">
            <label htmlFor='phone'>Verify your phone number</label>
            <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                id='phone'
            />
            {!otpSent && (
                <button onClick={onSignup} disabled={loading}>
                    {loading && <CgSpinner className='animate-spin' />}
                    <span>Send code via SMS</span>
                </button>
            )}
        </div>
    );
};

export default PhoneVerification;
