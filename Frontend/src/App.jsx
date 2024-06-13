import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from '../src/routes'
import './App.css';
import ModelTypes from './components/ModelTypes/ModelTypes';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {<Navbar />}
      {/*<SignUp />*/}
      <Login />
      {/*<ModelTypes/>
      <AnimatePresence mode='wait'>
        <AppRoutes location={location} key={location.pathname} />
      </AnimatePresence>*/}
    </div>
  );
};

export default App;
