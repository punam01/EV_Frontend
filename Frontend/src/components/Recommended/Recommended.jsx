import React from 'react'
import './Recommended.css'

const Recommended = ({handleClick}) => {
  return (
    <div className='recommended-container'>
      <h2 className="recommended-title">
        Recommended
      </h2>
      <div className='recommended-flex'>
      <button className='r-btns' onClick={()=>handleClick(null)}>All Vehicles</button>
      <button className='r-btns' onClick={()=>handleClick('Model A')}>Model A</button>
      <button className='r-btns' onClick={()=>handleClick('Model B')}>Model B</button>
      <button className='r-btns' onClick={()=>handleClick('Model C')}>Model C</button>
      <button className='r-btns' onClick={()=>handleClick('Model D')}>Model D</button>
      </div>
    </div>
  )
}

export default Recommended
