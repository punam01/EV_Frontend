import React, { useState } from 'react';
import Experience from './Experience';
import ConfiguratorM4 from './ConfiguratorM4';
import './DigitalShowroom.css';
import { useLocation } from 'react-router-dom';

const DigitalShowroom = () => {
  const [selectedColor, setSelectedColor] = useState('#333333');
  const [selectedIntColor, setSelectedIntColor] = useState('#333333');
  const [selectedRim, setSelectedRim] = useState('gray');
  const [windowGlass, setWindowGlass] = useState('tintedGlass')
  const location=useLocation();
  const car=location.state.car ;
  return (
    <div className="showroom-container">
      <div
        className="carousel-content"
        style={{ transform: `translateX(0)` }}
      >
        <Experience color={selectedColor} interiorColor={selectedIntColor} wheelColor={selectedRim} windowGlass={windowGlass}  car={car}/>
        <ConfiguratorM4 onSelectColor={setSelectedColor} onSelectIntColor={setSelectedIntColor} onSelectWheel={setSelectedRim} onSelectWinGlass={setWindowGlass}/>
      </div>
    </div>
  );
};

export default DigitalShowroom;
