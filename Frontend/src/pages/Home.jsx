import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import transition from '../transition';
import './Home.css';
import video1 from '/public/assets/bmw1_medium.mp4';
import video2 from '/public/assets/carlight_medium.mp4';
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { GiStarShuriken } from "react-icons/gi";
import Experience from './DigitalShowroom/Experience';
import CompareCars from './CompareCars/CompareCars';

const Home = () => {
  const toggleMenu = () => {
    // Add your toggle menu logic here
  };

  const changeBgVideo = (videoSrc) => {
    const videos = document.querySelectorAll('.bg-video');
    videos.forEach((video) => {
      video.classList.remove('active');
      if (video.src.includes(videoSrc)) {
        video.classList.add('active');
      }
    });
  };

  const playVideo = () => {
    const activeVideo = document.querySelector('.bg-video.active');
    if (activeVideo) {
      activeVideo.play();
      document.querySelector('.play').classList.remove('active');
      document.querySelector('.pause').classList.add('active');
    }
  };

  const pauseVideo = () => {
    const activeVideo = document.querySelector('.bg-video.active');
    if (activeVideo) {
      activeVideo.pause();
      document.querySelector('.pause').classList.remove('active');
      document.querySelector('.play').classList.add('active');
    }
  };

  useEffect(() => {
    // Initialize the carousel
    if (window.M && window.M.Carousel) {
      // Initialize the first carousel without indicators
      const galleryElems = document.querySelectorAll('.gallery .carousel');
      window.M.Carousel.init(galleryElems, { });

      // Initialize the second carousel with indicators
      const modelCarouselElems = document.querySelectorAll('.model-carousel .carousel');
      window.M.Carousel.init(modelCarouselElems, {
        fullWidth: true,
        indicators: true
      });
    }

    // Add event listeners to carousel items
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach((item) => {
      item.addEventListener('click', () => {
        const videoSrc = item.getAttribute('data-video');
        changeBgVideo(videoSrc);
      });
    });

    // Add event listeners to play/pause buttons
    document.querySelector('.play').addEventListener('click', playVideo);
    document.querySelector('.pause').addEventListener('click', pauseVideo);

    // Cleanup event listeners on component unmount
    return () => {
      carouselItems.forEach((item) => {
        item.removeEventListener('click', () => {
          const videoSrc = item.getAttribute('data-video');
          changeBgVideo(videoSrc);
        });
      });

      document.querySelector('.play').removeEventListener('click', playVideo);
      document.querySelector('.pause').removeEventListener('click', pauseVideo);
    };
  }, []);

  return (
    <>
      <div>
        <header>
          <span className='year'>2018-2023</span>
          <a href='' className='logo'>
            BMW
          </a>
          <a href="/" className='menu' onClick={toggleMenu}>
            <CiMenuFries className='icon' />
          </a>
        </header>
        <div className="banner">
          <ul className="nav">
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/models'>MODELS</Link></li>
            <li><Link to='/digital-showroom'>DIGITAL SHOWROOM</Link></li>
            <li><Link to='/test-drive'>TEST DRIVE</Link></li>
          </ul>
          <div className="bg-video-list">
            <video src={video1} className='bg-video car-1 active'
              autoPlay
              loop
              muted
            ></video>
            <video src={video2} className='bg-video car-2'
              autoPlay
              loop
              muted
            ></video>
          </div>
          <div className="gallery">
            <div className="carousel" data-indicators="false">
              <a className="carousel-item" href="#" data-video="bmw1_medium.mp4"><img src="/public/assets/images/car-1.png" alt="Car 1" />
                <h4>Car 1</h4></a>
              <a className="carousel-item" href="#" data-video="carlight_medium.mp4"><img src="/public/assets/images/car-1.png" alt="Car 2" />
                <h4>Car 2</h4></a>
              <a className="carousel-item" href="#" data-video="bmw1_medium.mp4"><img src="/public/assets/images/car-1.png" alt="Car 3" />
                <h4>Car 3</h4></a>
              <a className="carousel-item" href="#" data-video="carlight_medium.mp4"><img src="/public/assets/images/car-1.png" alt="Car 4" />
                <h4>Car 4</h4></a>
              <a className="carousel-item" href="#" data-video="bmw1_medium.mp4"><img src="/public/assets/images/car-1.png" alt="Car 5" />
                <h4>Car 5</h4></a>
            </div>
          </div>
          <a href="#" className='pause active' onClick={pauseVideo}>
            <FaPauseCircle />
          </a>
          <a href="#" className='play' onClick={playVideo}>
            <FaPlayCircle />
          </a>
        </div>
        <div className="car-info">
          <div className="container">
            <div className="icon">
              <GiStarShuriken />
            </div>
            <div className="head-text">
              <h2>THE SMART CHOICE<br /><span>FOR THE ROAD AHEAD</span></h2>
            </div>
            <div className="model-carousel">
              <div className="carousel" data-indicators="true">
                <a className="carousel-item" href="#">
                  <p>Car 1</p>
                  <img src="/public/assets/images/car04.png" />
                </a>
                <a className="carousel-item" href="#">
                  <p>Car 2</p>
                  <img src="/public/assets/images/car02.png" />
                </a>
                <a className="carousel-item" href="#">
                  <p>Car 3</p>
                  <img src="/public/assets/images/car03.png" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <CompareCars />
      </div>
    </>
  );
};

export default transition(Home);
