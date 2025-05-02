import FeaturedMovies from "../components/FeaturedMovies/FeaturedMovies";
import FeedbackSection from "../components/FeedbackSection/FeedbackSection";
import HeroSlider from "../components/HeroSlider/HeroSlider";

const HomePage = () => {
  return (
    <main>
      <HeroSlider/>
      <FeaturedMovies/>
      <FeedbackSection/>
    </main>
  );
};

export default HomePage;