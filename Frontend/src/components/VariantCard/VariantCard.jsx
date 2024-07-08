// src/components/VariantCard/VariantCard.jsx
import React from 'react';
import './VariantCard.css'
import { useNavigate } from 'react-router-dom';
const VariantCard = ({ variant, modelId, car }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/cardetails`,{ state: { car } });
    };

    const handleBookNow = () => {
        navigate(`/noconfig`,{ state: { car } });

    };

    return (
        <li className="variant-card__item">
            <div className="variant-card__item__nameprice">
                <div className="variant-card__item__carname">
                    <p className='variant-card__item__carname__name'>{variant.name}</p>
                    <p className='variant-card__item__carname__p'>{modelId}</p>
                </div>
                <div className="variant-card__carprice">
                    <p style={{ color: "#FF5919" }}>${variant.price}</p>
                    <p className='variant-card__item__carprice__p'>Starting Price</p>
                </div>
            </div>
            <div className="variant-card__item__imgholder">
                <img src="/assets/images/car_3d_t.png" alt="" />
            </div>
            <div className="variant-card__item__model-details">
                <div className="variant-card__item__model-details__item__range">
                    <p className="range">260<span>mi</span></p>
                    <span className="range">Range</span>
                </div>
                <div className="variant-card__item__model-details__item__speed">
                    <p className="speed">135<span>mph</span></p>
                    <span className="speed">Top Speed</span>
                </div>
                <div className="variant-card__item__model-details__item__acc">
                    <p className="acc">6.6<span>s</span></p>
                    <span className="acc">0-60mph</span>
                </div>
            </div>
            <div className="variant-card__item__model__model-data">
                <div className="variant-card__item__model__left-section">
                    <div className="seatingCap">
                        <p className='feature'>{car.seatingCapacity} Seat Interior </p>
                    </div>
                    <div className="steering">
                        <p className='feature'>{car.steering} Steering</p>
                    </div>
                </div>
                <div className="variant-card__item__model__right-section">
                    <div className="autopilot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
                            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
                            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
                        </svg>
                        <p className='feature'>{variant.autopilot ? "Autopilot" : "No Autopilot"}</p>
                    </div>
                </div>
            </div>

            {/*variant.customizableOptions && variant.customizableOptions.map((option, index) => (
                <div key={index} className='variant-card__item__model__option-list'>
                    <p className='feature'>Available {option.name}s</p>
                    <ul className="variant-card__item__model__option-list__ul">
                        {option.name === 'color' ? (
                            option.options.map((opt, idx) => {
                                console.log(opt.name);
                                (
                                <li key={idx} className="color-swatch">
                                    <span className="color-box" style={{ backgroundColor: opt.name }}></span>
                                </li>
                            )})
                        ) : ''}
                    </ul>
                </div>
            ))*/}
            <div className="variant-card__btn-group">
                <button className="variant-card__btn-group_btn" onClick={handleViewDetails}>View Details</button>
                <button className="variant-card__btn-group_btn" onClick={handleBookNow}>Book Now</button>
            </div>

        </li>
    );
};

export default VariantCard;
