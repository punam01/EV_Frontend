import React from 'react';
import './ExteriorPaint.css';

const ExteriorPaint = ({ onColorChange }) => {
  const colors = ['red', 'blue', 'black', 'white', 'gray'];

  return (
    <div>
      <h2 className="sidebar-title">Exterior Paint</h2>
      <div className="color-options">
        {colors.map((color) => (
          <label key={color} className={`color-option ${color}`}>
            <input type="radio" name="color" value={color} onChange={() => onColorChange(color)} />
            <span className="color-indicator"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ExteriorPaint;
