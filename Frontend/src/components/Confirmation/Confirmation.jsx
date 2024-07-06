import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';
const Confirmation = ({ confirmationMessage,bookingDetails, onClose, handleBooking }) => {
  const navigate = useNavigate();
  const [confirmed,setConfirmed]=useState(false);
  console.log(bookingDetails)
  const handleConfirm = () => {
    handleBooking();
    onClose();
  };
  return (
    <div className="confirmation-popup">
      <div className="confirmation-popup__content">
        <h2>Booking Confirmation</h2>
        <div className="confirmation-popup__details">
          {!confirmed?<p>Are you ready to embark on an unforgettable journey with your dream car?
            Let's make this happen! 🚗💨</p>:
            <p>Booking confirmed! Check your email for details.</p>
            }

        </div>
        <div className="confirmation-popup__actions">
          <button className="btn btn-confirm" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
      <div className="confirmation-popup__overlay" onClick={onClose}></div>
    </div>
  );
}

export default Confirmation
