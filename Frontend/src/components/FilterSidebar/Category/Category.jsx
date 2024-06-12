import React from 'react';
import './Category.css';

const Category = ({ cars, onCategoryChange }) => {
  //console.log(cars[0].name)
  return (
    <>
      <h2 className="sidebar-title">Category</h2>
      <div className="sidebar-items">
        {cars.map((car) => (
          <label key={car.name} className="sidebar-label-container">
            <input
              type="radio"
              name="category"
              value={car.name}
              onChange={() => onCategoryChange(car.name)} 
            />
            <span className="checkmark"></span>{car.name}
          </label>
        ))}
      </div>
    </>
  );
};

export default Category;
