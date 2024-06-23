import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../../services/carServices';
import { createPreBooking } from '../../services/preBookingService';
import { useUser } from '../../contexts/UserContext';

const PreBooking = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingDetails = {
        userId: user.userId, // Ensure user.userId is correctly set in UserContext
        carId: id,
        bookingTime: new Date(),
        contact: phone
      };

      await createPreBooking(bookingDetails);
      navigate(`/booking-success`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-container">
      <h1>Booking for {car.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default PreBooking;
