import React, { useEffect } from 'react';
import PhoneVerification from '../PhoneVerification/PhoneVerification';
import UserDetails from '../UserDetails/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setSignupStatus, selectSignupStatus, selectUser } from '../../features/user/userSlice';

function SignUp() {
  const dispatch = useDispatch();
  const signupStatus = useSelector(selectSignupStatus);
  const user = useSelector(selectUser);
  console.log('init state',user)
  
  useEffect(() => {
    const storedSignupStatus = localStorage.getItem('signupStatus');
    if (storedSignupStatus) {
      dispatch(setSignupStatus(JSON.parse(storedSignupStatus)));
    }
  }, [dispatch]);

  const handlePhoneVerificationSuccess = (userData) => {
    dispatch(setSignupStatus(true));
    dispatch(setUser(userData)); 
  };
  const customId=localStorage.getItem('customId');
  return (
    <div>
      { !customId ? (
        <PhoneVerification onSuccess={handlePhoneVerificationSuccess} />
      ) : (
        <UserDetails user={user} />
      )}
    </div>
  );
}

export default SignUp;
