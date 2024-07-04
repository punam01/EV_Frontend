import React from 'react';
import './TimeContainer.css';

const TimeContainer = ({ selectedTime, handleTimeChange }) => {
    const timeSlots = [
        { label: 'Morning', range: '10am - 1pm' },
        { label: 'Afternoon', range: '2pm - 5pm' },
        { label: 'Evening', range: '5pm - 8pm' },
    ];

    return (
        <div className="time-container">
            <h3 className="time-container__title">Select Time</h3>
            <div className="time-container__item">
                {timeSlots.map((slot, index) => (
                    <div
                        key={index}
                        className={`time-container__card ${selectedTime === slot.range ? 'demo-booking-details__time-card--active' : ''}`}
                        onClick={() => handleTimeChange(slot.range)}
                    >
                        <p className="time-container__text">{slot.label}</p>
                        <p className="time-container__range">{slot.range}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeContainer;
