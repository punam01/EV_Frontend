import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';
const Confirmation = ({ bookingDetails, onClose, handleBooking }) => {
  const navigate = useNavigate();
    
    const handleCancel = () => {
      onClose(); 
    };
    const handleConfirm = () => {
      handleBooking(); // Call the passed handleBooking function
      onClose(); // Close the popup after booking
    };
    return (
      <div className="confirmation-popup">
          <div className="confirmation-popup__content">
              <h2>Booking Confirmation</h2>
              <div className="confirmation-popup__details">
                  <h3>Booking Details:</h3>
                  <ul>
                      <li><strong>Car Model:</strong> {bookingDetails}</li>
                      
                  </ul>
              </div>
              <div className="confirmation-popup__actions">
                  <button className="btn btn-cancel" onClick={handleCancel}>Cancel Booking</button>
                  <button className="btn btn-confirm" onClick={handleConfirm}>Confirm Booking</button>
              </div>
          </div>
          <div className="confirmation-popup__overlay" onClick={onClose}></div>
      </div>
  );
}

export default Confirmation
