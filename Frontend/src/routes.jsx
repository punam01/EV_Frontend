import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DigitalShowroom from './pages/DigitalShowroom';
import PLP from './pages/PLP/PLP';
import PDP from './pages/PDP';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import UserProfilePage from './pages/UserProfile/UserProfilePage'
const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/showroom" element={<DigitalShowroom />} />
      <Route path="/products" element={<PLP />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<PDP />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
);

export default AppRoutes;
