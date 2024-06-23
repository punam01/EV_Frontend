import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import TestRide from './pages/TestRide/TestRide';
import DigitalShowroom from './pages/DigitalShowroom/DigitalShowroom';
import Home from './pages/Home';
import PLP from './pages/PLP/PLP';
import PDP from './pages/PDP';
import Blogs from './pages/Blogs/Blogs';
import PreBooking from './pages/PreBooking/PreBooking'
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes >
        <Route path="/testride" element={<TestRide />} />
        <Route path="/showroom" element={<DigitalShowroom />} />
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<PLP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars/:id" element={<PDP />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path='/prebooking/:id' element={<PreBooking />} />
      </Routes>
    </div>
  );
};

export default App;
