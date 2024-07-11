import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css'

const CarouselComponent=({carColor})=>{
        return (
            <Carousel className='carousel-container'
            showThumbs={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            interval={3000}
            >
                <div className='carousel__item'>
                    <img className="carousel__item__img" src={`/assets/images/cars/${carColor.toLowerCase()}_right.png`}/>
                </div>
                <div className='carousel__item'>
                    <img className="carousel__item__img" src={`/assets/images/cars/${carColor.toLowerCase()}_front.png`} />
                </div>
                <div className='carousel__item'>
                    <img className="carousel__item__img" src={`/assets/images/cars/${carColor.toLowerCase()}_left.png`} />
                </div>
            </Carousel>
        );
    
};

export default CarouselComponent;
