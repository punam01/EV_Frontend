import React from 'react';
import Category from './Category/Category';
import Colors from './Colors/Color';
import Steering from './Steering/Steering';
import AutopilotFilter from './Autopilot/Autopilot';
import SeatingCapacityFilter from './SeatingCapacity/SeatingCapacity';
import './Sidebar.css'
const Sidebar = ({
  handleChange,
  handleSteeringChange,
  handleAutopilotChange,
  handleSeatingCapacityChange
}) => {
  return (
    <section className='sidebar-container'>
      <Category handleChange={handleChange} />
      <Colors handleChange={handleChange} />
      <Steering handleChange={handleSteeringChange} />
      <AutopilotFilter handleAutopilotChange={handleAutopilotChange} />
      <SeatingCapacityFilter handleSeatingCapacityChange={handleSeatingCapacityChange} />
    </section>
  );
};

export default Sidebar;
