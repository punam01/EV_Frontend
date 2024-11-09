import React, { useEffect, useState } from 'react';
import Experience from './Experience';
import ConfiguratorM4 from './ConfiguratorM4';
import './DigitalShowroom.css';
import { useLocation } from 'react-router-dom';

const defaultCar = {
  _id: "668502e0e0a58a6efcf4ac2d",
  modelId: "Auto 3D-M60",
  name: "Auto 3D-i5",
  basePrice: 70000,
  range: "LR",
  topSpeed: 182,
  seatingCapacity: 4,
  cargoCapacity: 17,
  acceleration: 3.8,
  images: ["/assets/images/bmw_1.jpg", "https://example.com/images/bmw-m4-2024-2.jpg"],
  color: ["#D9D9D9", "#68736B", "#333333", "#001A4D", "#F1F1F1"],
  steering: "wheel",
  autopilot: true,
  edition: "standard",
  chargerType: "Type 2 Plug",
  customizableOptions: [
    {
      name: "Exterior Color",
      options: [
        { name: "Black", price: 1000, code: "#0c0908" },
        { name: "Olive", price: 1200, code: "#68736B" },
        { name: "Gray", price: 1500, code: "#333333" },
        { name: "Blue", price: 1800, code: "#000F89" },
        { name: "White", price: 2000, code: "#F1F1F1" },
      ]
    },
    {
      name: "Interior Color",
      options: [
        { name: "Orange", price: 800, code: "#F5A777" },
        { name: "Maroon", price: 900, code: "#730721" },
        { name: "Black", price: 1000, code: "#070707" },
        { name: "White", price: 1100, code: "#F1F1F1" },
      ]
    },
    {
      name: "Wheels",
      options: [
        { name: "Gray Wheels", price: 2500, code: "gray" },
        { name: "Black Wheels", price: 2700, code: "black" }
      ]
    },
    {
      name: "Glass",
      options: [
        { name: "Tinted Glass", price: 300, code: "tintedGlass" },
        { name: "Tempered Glass", price: 400, code: "temperedGlass" },
        { name: "Laminated Glass", price: 500, code: "laminatedGlass" }
      ]
    }
  ]
};

const DigitalShowroom = () => {
  const [selectedColor, setSelectedColor] = useState('#333333');
  const [selectedIntColor, setSelectedIntColor] = useState('#333333');
  const [selectedRim, setSelectedRim] = useState('gray');
  const [windowGlass, setWindowGlass] = useState('tintedGlass')
  const location=useLocation();  
  const [car, setCar] = useState(defaultCar);

  useEffect(() => {
    if (location.state?.car) {
      console.log(" car set")
      setCar(location.state.car);
    } else {
      console.log(" default car set")
      setCar(defaultCar);
    }
  }, [location.state?.car]);
  //const car=location.state?.car || defaultCar;
  return (
    <div className="showroom-container">
      <div
        className="carousel-content"
        style={{ transform: `translateX(0)` }}
      >
        <Experience color={selectedColor} interiorColor={selectedIntColor} wheelColor={selectedRim} windowGlass={windowGlass}  car={car}/>
        <ConfiguratorM4 onSelectColor={setSelectedColor} onSelectIntColor={setSelectedIntColor} onSelectWheel={setSelectedRim} onSelectWinGlass={setWindowGlass} car={car}/>
      </div>
    </div>
  );
};

export default DigitalShowroom;
