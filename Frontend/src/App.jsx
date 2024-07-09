import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import UserProfilePage from './pages/UserProfile/UserProfilePage';

import DigitalShowroom from './pages/DigitalShowroom/DigitalShowroom';
import Home from './pages/Home';
import PLP from './pages/PLP/PLP';
import PDP from './pages/PDP/PDP';
import Blogs from './pages/Blogs/Blogs';
import PreBooking from './pages/PreBooking/PreBooking'
import DemoDriveBooking from './pages/DemoDriveBooking/DemoDriveBooking';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreBookingPage from './pages/PreBookingPage/PreBookingPage';
import CompareCars from './pages/CompareCars/CompareCars';
import HomePage from './pages/HomePage/HomePage';
import CarDetailsPage from './pages/CarDetailsPage/CarDetailsPage';
import Checkout from './pages/Checkout/Checkout';
import PreBookingWithoutConfig from './pages/PreBookingWithoutConfig/PreBookingWithoutConfig';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App"> 
    <ToastContainer position="top-center" autoClose={3000} />
    <Navbar/>     
      <Routes >
        <Route path='/cardetails' element={<CarDetailsPage />}/>
        <Route path="/showroom" element={<DigitalShowroom />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<PLP />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars/:id" element={<PDP />} />
        <Route path="/profile1" element={<UserProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path='/prebooking/:id' element={<PreBooking />} />
        <Route path='/demodrive' element={<DemoDriveBooking/>}/>
        <Route path='/pre' element={<PreBookingPage />}/>
        <Route path='/prebooking-dets' element={<PreBooking />}/>
        <Route path='/compare' element={<CompareCars />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/noconfig" element={<PreBookingWithoutConfig />} />
      </Routes>
    </div>
  );
};

export default App;
