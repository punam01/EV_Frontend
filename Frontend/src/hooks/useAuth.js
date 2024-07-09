import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('USER');
    setIsLoggedIn(!!user);
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem('USER');
    localStorage.removeItem('zip');
    localStorage.removeItem('email');
    localStorage.removeItem('customId');
    localStorage.removeItem('last_name');
    localStorage.removeItem('address');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, logout };
};

export default useAuth;
