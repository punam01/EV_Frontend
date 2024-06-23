// components/SignUp/SignUp.js

import React from 'react';
import PhoneVerification from '../PhoneVerification/PhoneVerification';
import UserDetails from '../UserDetails/UserDetails';
import { useUser } from '../../contexts/UserContext';

function SignUp() {
  const { user, setUser } = useUser();

  const handlePhoneVerificationSuccess = (userData) => {
    setUser(userData); 
    console.log("signup",userData);
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
