import React, { useState } from 'react';
import PhoneVerification from '../PhoneVerification/PhoneVerification';
import UserDetails from '../UserDetails/UserDetails'
import '../Login/Login.css'
function SignUp() {
  const [user, setUser] = useState(null);

  const handlePhoneVerificationSuccess = (userData) => {
    setUser(userData);
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
