import React, { useState } from 'react';
import transition from '../../transition';
import './PLP.css'
import { AiFillStar } from "react-icons/ai";
import { BsBagHeartFill } from "react-icons/bs";
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';

const PLP = () => {
  const [variants, setVariants] = useState([]);

  const handleVariantsUpdate = (newVariants) => {
    setVariants(newVariants);
  };

  return (
    <div>
      <FilterSidebar onVariantsUpdate={handleVariantsUpdate} />
      <section className="card-container">
        {variants.map((variant) => (
          <section className="card" key={variant._id}>
            {/*<img className='card-img' src={variant.images[0]} alt={variant.name} />*/}
            <div className="card-details">
              <h3 className="card-title">{variant.name}</h3>
              <section className="card-reviews">
                <AiFillStar className='ratings-star'/><AiFillStar className='ratings-star'/><AiFillStar className='ratings-star'/><AiFillStar className='ratings-star'/><AiFillStar className='ratings-star'/>
                <span className="total-reviews">5</span>
              </section>
              <section className="card-price">
                <div className="price">
                  <del>${variant.oldPrice}</del>${variant.price}
                </div>
                <div className="bag">
                  <BsBagHeartFill />
                </div>
              </section>
            </div>
          </section>
        ))}
      </section>
    </div>
  );
};


export default transition(PLP);
