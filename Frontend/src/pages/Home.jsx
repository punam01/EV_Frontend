import React from 'react';
import { Link } from 'react-router-dom';
import CarList from '../components/CarList';
import transition from '../transition';
const Home = () => (
  <div>
    <h1>Welcome to the EV Website</h1>
    <CarList/>
  </div>
);

export default transition(Home);
