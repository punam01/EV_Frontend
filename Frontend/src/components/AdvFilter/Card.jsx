import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useUser } from '../../contexts/UserContext';

const Card = ({ img, title, star, reviews, prevPrice, id }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  console.log(user)

  const handleViewDetails = () => {
    navigate(`/cars/${id}`);
  };

  const handleBookNow = () => {
      navigate(`/prebooking/${id}`);
  
  };

  return (
    <div className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-details">
        <h2 className="card-title">{title}</h2>
        <div className="card-price">Starting at ${prevPrice}</div>
        <div className="card-star">
          <AiFillStar /> {star} ({reviews} reviews)
        </div>
        <button onClick={handleViewDetails}>View Details</button>
        <button onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default Card;
