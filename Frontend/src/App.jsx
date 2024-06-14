import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from '../src/routes'
import './App.css';
import ModelTypes from './components/ModelTypes/ModelTypes';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import { UserProvider } from './contexts/UserContext'
import TestRide from './pages/TestRide/TestRide';
import Zipcode from './pages/TestRide/Zipcode';

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set login status
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <UserProvider>
    <div className="App">
      
    {<Navbar />}
      <Routes ><Route path="/testride" element={<TestRide />} /></Routes>
    
      {/*<SignUp />
      {!isLoggedIn ? (
          <Login onLoginSuccess={handleLogin} /> 
        ) : (
          <UserProfilePage />
        )}*/}
        {/*<AppRoutes location={location} key={location.pathname} />*/}
        
    </div>
    </UserProvider>
  );
};

export default App;
