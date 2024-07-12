import React from 'react';

const Input = ({ handleChange, name, title, options }) => {
  return (
    <div className='sidebar-items'>
      <label htmlFor={name} className='item-label'>{title}</label>
      <select style={{display:'block'}} name={name} id={name} className='item-select' onChange={handleChange}>
      <option value="All" className='item-option'>All</option>
        {options.map((option, index) => (
          <option key={index} value={option} className='item-option'>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Input;
