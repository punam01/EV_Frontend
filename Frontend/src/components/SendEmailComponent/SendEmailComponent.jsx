import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './SendEmailComponent.css'
const SendEmailComponent = ({ bookingData }) => {
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        // Function to get the day suffix (e.g., 'st', 'nd', 'rd', 'th')
        const getDaySuffix = (day) => {
            if (day > 3 && day < 21) return 'TH'; // Exception for 11th, 12th, 13th, etc.
            switch (day % 10) {
                case 1: return 'ST';
                case 2: return 'ND';
                case 3: return 'RD';
                default: return 'TH';
            }
        };
    
        // Array of month names
        const months = [
            'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY',
            'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
        ];
    
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const suffix = getDaySuffix(day);
    
        return `${day}${suffix} ${month} ${year}`;
    };
    const formatTime = (dateString, use24HourFormat = false) => {
        const date = new Date(dateString);
    
        // Get hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();
    
        if (!use24HourFormat) {
            // Convert to 12-hour format with AM/PM
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
            return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
        } else {
            // 24-hour format
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
    };
    
    const templateParams = {
      to_name: 'Customer',
      to_email: bookingData.contact, 
      bookingId: bookingData._id.slice(-10),
      carModel: 'BMW',
      date: formatDate(bookingData.bookingTime),
      time: formatTime(bookingData.bookingTime),
      address: bookingData.location.name+", "+bookingData.location.address+", "+bookingData.location.city+', '+bookingData.location.state+', '+bookingData.location.pincode || "400020",
      exteriorColor: bookingData.customization.exteriorColor.value,
      interiorColor: bookingData.customization.interiorColor.value,
      wheel: bookingData.customization.wheelColor.value,
      glass: bookingData.customization.glass.value || "Tinted Glass",
      range: bookingData.customization.range.value || "Long Range",
    };

    emailjs.send('service_5qfsdxa', 'template_e4p9166', templateParams, 'qVtlGMpfckPpBoe7-')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setIsSending(false);
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setSendError('Failed to send email. Please try again later.');
        setIsSending(false);
      });
  };

  return (
    <div className="send-email-container">
      <form onSubmit={sendEmail}>
        <h2>Send Booking Confirmation</h2>
        {sendError && <p className="error">{sendError}</p>}
        <button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
};

export default SendEmailComponent;
