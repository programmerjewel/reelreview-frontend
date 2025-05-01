// src/components/HeroSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HeroSlider = () => {
  // Slide data (customize as needed)
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

  return (
    <div className="relative h-[80vh] w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Backdrop Filter Blur + Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
              
              {/* Slide Content (Centered) */}
              <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  {slide.description}
                </p>
                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300">
                  {slide.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;