import React from 'react'
import './DateContainer.css'
const DateContainer = ({selectedDate,handleDateChange}) => {
    return (
        <div className="date-container">
            <h3 className='date-container__title'>Select Date</h3>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className='date-container__input'
            />
        </div>
    )
}

export default DateContainer
