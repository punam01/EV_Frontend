// components/SignUp/SignUp.js

import React from 'react';
import PhoneVerification from '../PhoneVerification/PhoneVerification';
import UserDetails from '../UserDetails/UserDetails';
import { useUser } from '../../contexts/UserContext';

function SignUp() {
  const { user, setUser } = useUser();

  const handlePhoneVerificationSuccess = (userData) => {
    setUser(userData); // Set user in UserContext
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
