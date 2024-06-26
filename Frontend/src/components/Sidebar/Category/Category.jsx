import React from 'react';
import Input from '../../AdvFilter/Input';
import './Category.css';

const Category = ({ handleChange }) => {
  const options = ["ModelA", "ModelB", "ModelC", "ModelD"];
  
  return (
    <Input 
      handleChange={handleChange}
      name="cars"
      title="Car Model"
      options={options}
    />
  );
}

export default Category;
