import React from 'react';

const SeatingCapacity = ({ handleSeatingCapacityChange }) => {
  return (
    <div className="filter">
      <label htmlFor="seatingCapacity">Cargo Capacity:</label>
      <select style={{display:'block'}} id="seatingCapacity" name="seatingCapacity" onChange={handleSeatingCapacityChange}>
        <option value="">Select</option>
        <option value="2">2 seats</option>
        <option value="5">5 seats</option>
        <option value="7">7 seats</option>
      </select>
    </div>
  );
};

export default SeatingCapacity;
