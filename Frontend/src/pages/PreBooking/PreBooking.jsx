import React, { useEffect, useState } from 'react';
import { bookCar } from '../../services/preBookingService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

const PreBooking = () => {
  const user = useSelector(selectUser);
  const [carId, setCarId] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [contact, setContact] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  useEffect(() => {
    // Get carId and userId from local storage
    const storedCarId = localStorage.getItem('carId');
    const storedUserId = localStorage.getItem('USER');

    if (storedCarId) setCarId(storedCarId);
    if (storedUserId) {
      // Assuming you have a way to set the userId in the user object
      // You can also directly set the userId in the state if needed
    }
  }, []);

  const handleBooking = async () => {
    try {
      const bookingData = {
        userId: user.uid, // Assuming user object has uid property
        carId,
        bookingTime,
        contact,
        paymentMade: true,
      };
      const bookedCar = await bookCar(bookingData);
      console.log('Booked Car:', bookedCar);
    } catch (error) {
      console.error('Error booking car:', error);
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <input type="text" placeholder="Car ID" value={carId} onChange={(e) => setCarId(e.target.value)} />
      <input type="datetime-local" placeholder="Booking Time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} />
      <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
      <button onClick={handleBooking}>Book Car</button>
    </div>
  );
};

export default PreBooking;
