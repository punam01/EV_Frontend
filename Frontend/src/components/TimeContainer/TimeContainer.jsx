import React from 'react'

const TimeContainer = ({selectedTime,availableTimes,handleTimeChange}) => {
    const formatTime = (time) => {
        let [hours, minutes] = time.split('T')[1].split(':').slice(0, 2);
        hours = parseInt(hours, 10);
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; 
        return `${hours}:${minutes} ${period}`;
    };

    return (
        <div className="time">
            <h3>Select Time</h3>
            <div className="time-container">
                {availableTimes.map((time, index) => (
                    <div
                        key={index}
                        className={`time-card ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => handleTimeChange(time)}
                    >
                        <p>{formatTime(time)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TimeContainer
