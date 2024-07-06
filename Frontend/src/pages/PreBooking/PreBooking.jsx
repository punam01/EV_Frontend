import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PreBooking.css';
import CarouselComponent from '../../components/Carousel/CarouselComponent';

const PreBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOptions, totalPrice, carData } = location.state || {};
  console.log(selectedOptions)
  const handleCheckout = () => {
    navigate('/checkout', { state: { selectedOptions, totalPrice, carData } });
  };

  return (
    <div className="pre-booking-page">
      {selectedOptions ? (
        <>
          <div className='pre-booking-page__left'>
            <CarouselComponent />
          </div>
          <div className='pre-booking-page__right'>
            <div className="pre-booking-page__right__carname">
              <h1>Your Configured {carData.name}</h1>
              <div className="pre-booking-page__right__carname__baseprice">
                <p>Base Price</p>
                <p>${carData.basePrice}</p>
              </div>
              <div className="pre-booking-page__right__carname__addprice">
                <p>Additional Price</p>
                <p>${totalPrice}</p>
              </div>
            </div>
            <div className="pre-booking-page__right__cardetails">
              <div className="pre-booking-page__right__cardetails__item">
                <div className="pre-booking-page__right__cardetails__item-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette-fill" viewBox="0 0 16 16">
                    <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                  </svg>
                  <p>Exterior Color: {selectedOptions.exteriorColor.name}</p>
                </div>
                <div className="pre-booking-page__right__cardetails__item-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <p>${selectedOptions.exteriorColor.price}</p>
                </div>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <div className="pre-booking-page__right__cardetails__item-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
                    <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
                  </svg>
                  <p>Interior Color: {selectedOptions.interiorColor.name}</p>
                </div>
                <div className="pre-booking-page__right__cardetails__item-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <p>${selectedOptions.interiorColor.price}</p>
                </div>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <div className="pre-booking-page__right__cardetails__item-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  </svg>
                  <p>Wheel: {selectedOptions.wheel.name}</p>
                </div>
                <div className="pre-booking-page__right__cardetails__item-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <p>${selectedOptions.wheel.price}</p>
                </div>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <div className="pre-booking-page__right__cardetails__item-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
                    <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z" />
                  </svg>
                  <p>Glass: {selectedOptions.glass.name}</p>
                </div>
                <div className="pre-booking-page__right__cardetails__item-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <p>${selectedOptions.glass.price}</p>
                </div>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <div className="pre-booking-page__right__cardetails__item-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layer-forward" viewBox="0 0 16 16">
                    <path d="M8.354.146a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l1 1a.5.5 0 0 0 .708 0L7 4.207V12H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9V4.207l.646.647a.5.5 0 0 0 .708 0l1-1a.5.5 0 0 0 0-.708z" />
                    <path d="M1 7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5a.5.5 0 0 0 0-1H1V8h4.5a.5.5 0 0 0 0-1zm9.5 0a.5.5 0 0 0 0 1H15v2h-4.5a.5.5 0 0 0 0 1H15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z" />
                  </svg>
                  <p>Range: {selectedOptions.range.value}</p>
                </div>
                <div className="pre-booking-page__right__cardetails__item-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <p>${selectedOptions.range.price}</p>
                </div>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <div className="pre-booking-page__right__cardetails__item-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ev-station" viewBox="0 0 16 16">
                    <path d="M3.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm2.131 10.46H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764z" />
                    <path d="M3 0a2 2 0 0 0-2 2v13H.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H11v-4a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 0 3 0V4a.5.5 0 0 0-.146-.354l-.5-.5a.5.5 0 0 0-.707 0l-.5.5A.5.5 0 0 0 13 4v3c0 .71.38 1.096.636 1.357l.007.008c.253.258.357.377.357.635v3.5a.5.5 0 1 1-1 0V12a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zm7 2v13H2V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                  </svg>
                  <p>Charger: {selectedOptions.chargerType.value}</p>
                </div>
                <div className="pre-booking-page__right__cardetails__item-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <p>${selectedOptions.chargerType.price}</p>
                </div>
              </div>
            </div>

            <button onClick={handleCheckout} className="pre-booking-page__right__cardetails__checkout">Checkout</button>
          </div>
        </>
      ) : (
        <p>No options selected.</p>
      )
      }

    </div >
  );
};

export default PreBooking;
