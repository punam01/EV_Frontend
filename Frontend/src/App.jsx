import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import { UserProvider } from './contexts/UserContext'
import TestRide from './pages/TestRide/TestRide';
import DigitalShowroom from './pages/DigitalShowroom/DigitalShowroom';
import Home from './pages/Home';
import PLP from './pages/PLP/PLP';
import PDP from './pages/PDP';
import Vehicles from './pages/Vehicles/Vehicles';

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
        <Routes >
          <Route path="/testride" element={<TestRide />} />
          <Route path="/showroom" element={<DigitalShowroom />} />
          {/*<Route path="/" element={<Home />} />*/}
          <Route path="/vehicles" element={<PLP />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<PDP />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
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
