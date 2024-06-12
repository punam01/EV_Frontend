import React from 'react';
import './Steering.css';

const Steering = ({ onSteeringChange }) => {
  return (
    <>
      <h2 className="sidebar-title">Steering</h2>
      <div className="sidebar-items">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="steering"
            value="wheel"
            onChange={() => onSteeringChange('wheel')}
          />
          <span className="checkmark"></span>Wheel
        </label>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="steering"
            value="yoke"
            onChange={() => onSteeringChange('yoke')}
          />
          <span className="checkmark"></span>Yoke
        </label>
      </div>
    </>
  );
};

export default Steering;
