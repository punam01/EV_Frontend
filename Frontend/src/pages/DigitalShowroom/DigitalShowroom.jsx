import React, { useState } from 'react';
import Experience from './Experience';
import ConfiguratorM4 from './ConfiguratorM4';
import './DigitalShowroom.css';

const DigitalShowroom = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#333333'); // Default selected exterior color
  const [selectedIntColor, setSelectedIntColor] = useState('#333333'); // Default selected interior color
  const [selectedRim, setSelectedRim] = useState('black');
  const [windowGlass,setWindowGlass]=useState()
  const slides = [
    { component: <Experience color={selectedColor} interiorColor={selectedIntColor} wheelColor={selectedRim} windowGlass={windowGlass} />, configurator: <ConfiguratorM4 onSelectColor={setSelectedColor} onSelectIntColor={setSelectedIntColor} onSelectWheel={setSelectedRim} onSelectWinGlass={setWindowGlass}/> },
    { component: <Experience color={selectedColor} interiorColor={selectedIntColor} wheelColor={selectedRim} windowGlass={windowGlass}/>, configurator: <ConfiguratorM4 onSelectColor={setSelectedColor} onSelectIntColor={setSelectedIntColor}  onSelectWheel={setSelectedRim} onSelectWinGlass={setWindowGlass}/> },
    { component: <Experience color={selectedColor} interiorColor={selectedIntColor} wheelColor={selectedRim} windowGlass={windowGlass}/>, configurator: <ConfiguratorM4 onSelectColor={setSelectedColor} onSelectIntColor={setSelectedIntColor}  onSelectWheel={setSelectedRim} onSelectWinGlass={setWindowGlass}/> },
  ];

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-content"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {slide.component}
            {slide.configurator}
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DigitalShowroom;
