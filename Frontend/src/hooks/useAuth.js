import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('customId');
    setIsLoggedIn(!!user);
  }, []);

  const logout = () => {
    localStorage.removeItem('USER');
    localStorage.removeItem('zip');
    localStorage.removeItem('email');
    localStorage.removeItem('customId');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, logout };
};

export default useAuth;
