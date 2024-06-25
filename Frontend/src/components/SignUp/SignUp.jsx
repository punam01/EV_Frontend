import React from 'react';
import PhoneVerification from '../PhoneVerification/PhoneVerification';
import UserDetails from '../UserDetails/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectUser } from '../../features/user/userSlice';

function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handlePhoneVerificationSuccess = (userData) => {
    dispatch(setUser(userData)); 
    console.log("signup", userData);
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
