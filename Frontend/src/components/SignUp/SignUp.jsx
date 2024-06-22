// src/components/SignUp/SignUp.js
import React, { useContext } from 'react';
import PhoneVerification from '../PhoneVerification/PhoneVerification';
import UserDetails from '../UserDetails/UserDetails';
import { useUser } from '../../contexts/UserContext';
import '../Login/Login.css';

function SignUp() {
  const { user, setUser } = useUser();

  const handlePhoneVerificationSuccess = (userData) => {
    setUser(userData);
    console.log(userData);
  };

  return (
    <div>
      {!user ? (
        <PhoneVerification onSuccess={handlePhoneVerificationSuccess} />
      ) : (
        <UserDetails user={user} />
      )}
    </div>
  );
}

export default SignUp;
