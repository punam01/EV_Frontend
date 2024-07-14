import React from 'react'
import './BookedCarDetails.css'
import InvoiceComponent from '../InvoiceComponent/InvoiceComponent';

const BookedCarDetails = ({ carData, bookingData, selectedCarId, setOpenViewDetails }) => {

    const filteredBookings = bookingData.filter(booking => booking.carId._id === selectedCarId);
    console.log("Filtered", bookingData)
    const totalPrice=filteredBookings[0].estimatedPrice+carData.basePrice;
    return (
        <div className='booked-car-details__container'>
            <div className="booked-car-details__carname">
                <div className="booked-car-details__carname-left">
                    <h2>{carData.modelId}</h2>
                    <p>Order ID #{filteredBookings[0]._id.slice(-10)}</p>
                </div>
                <div className="booked-car-details__carname-right">
                    <button className="booked-car-details__carname-btn" onClick={() => setOpenViewDetails(false)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg></button>
                    <InvoiceComponent bookingData={filteredBookings[0]}/>
                </div>
            </div>
            <div className='booked-car-details__booking-info'>
                <div className="booked-car-details__booking-info__left">
                    <img src={`/assets/images/cars/${filteredBookings[0]?.customization?.exteriorColor?.value.toLowerCase()}_left.png`} alt="" />
                </div>
            </div>
            <div className="booked-car-details__estimatedPrice">
                <table>
                    <tr>
                        <th>Configuration</th>
                        <th>Value</th>
                        <th className='booked-car-details__price'>Amount</th>
                    </tr>
                    <tr>
                        <td>Exterior Color</td>
                        <td>{filteredBookings[0].customization.exteriorColor?.value}</td>
                        <td className='booked-car-details__price'>₹{filteredBookings[0].customization.exteriorColor?.price}</td>
                    </tr>
                    <tr>
                        <td>Interior Color</td>
                        <td>{filteredBookings[0].customization.interiorColor.value}</td>
                        <td className='booked-car-details__price'>₹{filteredBookings[0].customization.interiorColor.price}</td>
                    </tr>
                    <tr>
                        <td>Wheel</td>
                        <td>{filteredBookings[0].customization.wheelColor.value}</td>
                        <td className='booked-car-details__price'>₹{filteredBookings[0].customization.wheelColor.price}</td>
                    </tr>
                    <tr>
                        <td>Glass</td>
                        <td>{filteredBookings[0].customization.glass.value}</td>
                        <td className='booked-car-details__price'>₹{filteredBookings[0].customization.glass.price}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Base Price</td>
                        <td className='booked-car-details__price'>₹{carData.basePrice}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{fontWeight:'bold'}}>TOTAL PRICE</td>
                        <td className='booked-car-details__price' style={{fontWeight:'bold'}}>₹{totalPrice}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default BookedCarDetails
