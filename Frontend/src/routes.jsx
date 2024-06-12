import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DigitalShowroom from './pages/DigitalShowroom';
import PLP from './pages/PLP/PLP';
import PDP from './pages/PDP';

const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/showroom" element={<DigitalShowroom />} />
      <Route path="/products" element={<PLP />} />
      <Route path="/product/:id" element={<PDP />} />
    </Routes>
);

export default AppRoutes;
