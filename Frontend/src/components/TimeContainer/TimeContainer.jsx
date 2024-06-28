import React from 'react'
import './TimeContainer.css'

const TimeContainer = ({ selectedTime, availableTimes, handleTimeChange }) => {
    const formatTime = (time) => {
        let [hours, minutes] = time.split('T')[1].split(':').slice(0, 2);
        hours = parseInt(hours, 10);
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    };

    return (
        <div className="time-container">
            <h3 className="time-container__title">Select Time</h3>
            <div className="time-container__item">
                {availableTimes.map((time, index) => (
                    <div
                        key={index}
                        className={`time-container__card ${selectedTime === time ? 'demo-booking-details__time-card--active' : ''}`}
                        onClick={() => handleTimeChange(time)}
                    >
                        <p className="time-container__text">{formatTime(time)}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default TimeContainer
