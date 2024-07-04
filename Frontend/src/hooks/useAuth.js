import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('USER');
    setIsLoggedIn(!!user);
  }, []);

  return isLoggedIn;
};

export default useAuth;
