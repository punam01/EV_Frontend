import React from 'react';
import Category from './Category/Category';
import Colors from './Colors/Color';
import Steering from './Steering/Steering';
import Autopilot from './Autopilot/Autopilot';
import SeatingCapacityFilter from './SeatingCapacity/SeatingCapacity';
import './Sidebar.css'
import Price from './Price/Price';
const Sidebar = ({
  handleChange,
  handlePriceRangeChange,
  handleSteeringChange,
  handleAutopilotChange,
  handleSeatingCapacityChange,
  cars
}) => {
  return (
    <section className='sidebar-container'>
      <Category handleChange={handleChange} cars={cars}/>
      <Price  handlePriceRangeChange={handlePriceRangeChange}/>
      {/*<Colors handleChange={handleChange} />*/}
      {/*<Steering handleChange={handleSteeringChange} />
       <Autopilot handleAutopilotChange={handleAutopilotChange} />
     <SeatingCapacityFilter handleSeatingCapacityChange={handleSeatingCapacityChange} />*/}
    </section>
  );
};

export default Sidebar;
