// src/components/HeroSlider.jsx
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Discover Blockbuster Hits",
      description: "Explore the latest and greatest movies in stunning detail.",
      cta: "Browse Now",
      bgImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "Curated Collections",
      description: "Handpicked movie lists for every mood and genre.",
      cta: "View Collections",
      bgImage: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Join the Community",
      description: "Rate, review, and share your favorite films with others.",
      cta: "Explore Now",
      bgImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Custom Navigation Arrows
  const CustomNavButtons = () => {
    const swiper = useSwiper();
    
    return (
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
        <button
          onClick={() => swiper.slidePrev()}
          className="absolute left-0.5 md:left-3 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full md:p-3 p-1 backdrop-blur-sm transition duration-300 pointer-events-auto"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => swiper.slideNext()}
          className="absolute right-0.5 md:right-3 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 rounded-full md:p-3 p-1 backdrop-blur-sm transition duration-300 pointer-events-auto"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation={false} // Disable default navigation
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Backdrop Filter Blur + Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
              
              {/* Slide Content (Centered) */}
              <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <h1 className="text-white text-3xl md:text-5xl font-bold">
                  {slide.title}
                </h1>
                <p className="md:text-md text-gray-200 my-4">
                  {slide.description}
                </p>
                <Link to='/movies' className="btn bg-red-500 border-none shadow-none text-white">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Add Custom Navigation Arrows */}
        <CustomNavButtons />
      </Swiper>
    </div>
  );
};

export default HeroSlider;