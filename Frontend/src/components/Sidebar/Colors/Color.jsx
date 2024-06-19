import React from 'react';
import Input from '../../AdvFilter/Input';
import './Color.css';

const Color = () => {
  const options = ["White", "Blue", "Gray", "Red"];
  
  return (
    <Input 
      handleChange={(event) => console.log(event.target.value)}
      name="colors"
      title="Car Color"
      options={options}
    />
  );
}

export default Color;
