import React from 'react'
import './Price.css'
import Input from '../../AdvFilter/Input';
const Price = ({handlePriceRangeChange}) => {
  const options = [
    "0-500000",
    "500001-1000000",
    "1000001-1500000",
    "1500001-2000000",
    "2000001-2500000",
    "2500001-3000000",
    "3000001-3500000",
    "3500001-4000000",
    "4000001-4500000",
    "4500001-5000000"
  ];  
  return (
    <Input
      handleChange={handlePriceRangeChange}
      name="cars"
      title="Price Range"
      options={options}
    />
  )
}

export default Price
