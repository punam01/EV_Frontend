import React from 'react';
import Input from '../../AdvFilter/Input';
import './Category.css';

const Category = ({ handleChange, cars }) => {
  const uniqueModels = [...new Set(cars.map(car => car.modelId))];
  return (
    <Input 
      handleChange={handleChange}
      name="cars"
      title="Car Model"
      options={uniqueModels}
    />
  );
}

export default Category;
