import React, { useEffect, useState } from 'react';
import './DateContainer.css';

const DateContainer = ({ selectedDate, handleDateChange }) => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const getNext7Days = () => {
            const days = [];
            const today = new Date();
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                days.push({
                    date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short',year:"numeric" }), // Format: 04 July
                    label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' })
                });
                console.log(days)
            }
            setDates(days);
        };

        getNext7Days();
    }, []);

    return (
        <div className="date-container">
            <h3 className='date-container__title'>Select Date</h3>
            <div className="date-container__item">
                {dates.map((day, index) => (
                    <div
                        key={index}
                        className={`date-card ${selectedDate === day.date ? 'selected' : ''}`}
                        onClick={() => handleDateChange({ target: { value: day.date } })}
                    >
                        <p>{day.label}</p>
                        <p>{day.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DateContainer;
