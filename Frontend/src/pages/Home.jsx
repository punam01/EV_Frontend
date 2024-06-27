import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import transition from '../transition';
import './Home.css';
import video1 from '/public/assets/bmw1_medium.mp4';
import video2 from '/public/assets/carlight_medium.mp4';
import reel1 from '/public/assets/reel1.mp4';
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
    if (window.M && window.M.Carousel) {
      const galleryElems = document.querySelectorAll('.gallery .carousel');
      window.M.Carousel.init(galleryElems, {});

      const modelCarouselElems = document.querySelectorAll('.model-carousel .carousel');
      window.M.Carousel.init(modelCarouselElems, {
        fullWidth: true,
        indicators: true
      });
    }

    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach((item) => {
      item.addEventListener('click', () => {
        const videoSrc = item.getAttribute('data-video');
        changeBgVideo(videoSrc);
      });
    });

    document.querySelector('.play').addEventListener('click', playVideo);
    document.querySelector('.pause').addEventListener('click', pauseVideo);

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
      <div className='home-container'>
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
            <div className="brand-name">
              Electric
            </div>
            <div className="model-carousel">
              {/*<div className="carousel" data-indicators="true">
                <a className="carousel-item" href="#">
                  <img src="/public/assets/images/car04.png" />
                </a>
                <a className="carousel-item" href="#">
                  <img src="/public/assets/images/car02.png" />
                </a>
                <a className="carousel-item" href="#">
                  <img src="/public/assets/images/car03.png" />
                </a>
              </div>*/}
            </div>
            <div className="car-details">
              <div className="left">
                <p>Electric motor produce instant torque, or rotational force, which means electric cars can accelerate quickly from a stop.</p>
                <button className="explore-btn-grp">EXPLORE MORE<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg></span></button>
              </div>
              <div className="right">
                <p>480<sup>KM</sup> <span>Range upto</span></p>
                <p>320<sup>KW</sup>  <span>Power upto</span></p>
                <p>11,000<sup>LBS</sup>  <span>Tow up</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="car-exterior">
          <div className="car-ext-head">
            <h2>Active<br /><span>Exterior</span></h2>
            <p>Minimilistic design. Powerful Performance. The EV1 propels the driving exp into the post petrol era</p>
          </div>
          <div className="car-ext-img">
            <img src="/assets/images/car_3d_t.png" alt="" />
          </div>
          <div className="car-ext-end">
            <div className="color-swatches">
              <div className="swatch" style={{ backgroundColor: "#f3f2f2" }}></div>
              <div className="swatch" style={{ backgroundColor: "#fff" }}></div>
              <div className="swatch" style={{ backgroundColor: "orange" }}></div>
            </div>
          </div>
        </div>
        <div className="car-interior">
          <div className="car-int-head">
            <h2>DESIGN<br /><span>FOLLOWS</span><br />FUNCTIONS</h2>
            <p>Minimilistic design. Powerful Performance. The EV1 propels the driving exp into the post petrol era.Minimilistic design. Powerful Performance. The EV1 propels the driving exp into the post petrol era</p>
          </div>
          <div className="car-int-img">
            <div className="left">
              <img className="circle" src="/assets/images/steering.jpg" alt="" />
              <p>Refined Interior Design</p>
              <button className="explore-btn-grp">EXPLORE MORE<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg></span></button>
            </div>
            <div className="right">
              <img className="square" src="/assets/images/car-int.jpg" alt="" />
              <p>Topnocth Technology</p>
              <button className="explore-btn-grp">EXPLORE MORE<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg></span></button>
            </div>

          </div>
        </div>
        <div className="car-reels">
          <video src={reel1} autoPlay
            loop
            muted></video>
          <div className="overlay-text">HIGH<br /> PERFORMANCE <br />AND DURABILTY</div>
        </div>

        {/*<CompareCars />*/}
      </div>
    </>
  );
};

export default transition(Home);
