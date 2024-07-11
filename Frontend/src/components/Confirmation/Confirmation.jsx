import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';
import InvoiceComponent from '../InvoiceComponent/InvoiceComponent';
const Confirmation = ({ bookingDetails, onClose, handleBooking }) => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [open, setOpen] = useState(false);
  console.log(bookingDetails)
  const handleConfirm = () => {
    setConfirmed(true)
    handleBooking();
  };
  const handleClose = () => {
    onClose(); 
  };
  return (
    <div className="confirmation-popup">
      <div className="confirmation-popup__content">
        <h2>Booking Confirmation</h2>
        <div className="confirmation-popup__details">
          {!confirmed ?
            <>
              <p>Are you ready to embark on an unforgettable journey with your dream car?
                Let's make this happen! 🚗💨</p>
              <button className="btn btn-confirm" onClick={handleConfirm}>Confirm</button>
            </> :
            <>
              <p>Booking confirmed! Check your email for details.</p>
              <button className="btn btn-confirm" onClick={handleClose}>Close</button>
            </>
          }
        </div>

      </div>
      <div className="confirmation-popup__overlay" onClick={handleClose}></div>
    </div>
  );
}

export default Confirmation
