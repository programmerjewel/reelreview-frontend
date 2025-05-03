import FeaturedMovies from "../components/FeaturedMovies/FeaturedMovies";
import FeedbackSection from "../components/FeedbackSection/FeedbackSection";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import HowItWorks from "../components/HowItWorks/HowItWorks";

const HomePage = () => {
  return (
    <main>
      <HeroSlider/>
      <HowItWorks/>
      <FeaturedMovies/>
      <FeedbackSection/>
      
    </main>
  );
};

export default HomePage;