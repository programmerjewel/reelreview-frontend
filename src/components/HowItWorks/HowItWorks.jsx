

const HowItWorks = () => {

  // How ReelReview Works
  // Discover, Save, and Enjoy Movies Like Never Before

  // 1. Explore Unlimited Movies
  // Browse our curated collection of films across genres, ratings, and release years. Find hidden gems or popular blockbusters in seconds with smart search and filters.

  // 2. Personalize Your Experience
  // Save favorites to your watchlist, rate movies you’ve watched, and get tailored recommendations based on your taste. Your profile evolves as you engage.

  // 3. Stream or Share Instantly
  // Watch directly on our platform (if applicable) or get links to streaming services. Share reviews with our community and see what’s trending.
  const steps = [
    {
      icon: '🔍',  // or <SearchIcon className="w-6 h-6" />
      title: "Discover",
      text: "Browse our curated collection of films across genres, ratings, and release years. Find hidden gems or popular blockbusters in seconds with smart search and filters."
    },
    {
      icon: '📌',  // or <BookmarkIcon />
      title: "Save & Organize",
      text: "Save favorites to your watchlist, rate movies you’ve watched, and get tailored recommendations based on your taste. Your profile evolves as you engage."
    },
    {
      icon: '🎯',  // or <RecommendationIcon />
      title: "Get Recommendations",
      text: "AI suggests films based on your preferences. Share reviews with our community and see what’s trending."
    }
  ];
  return (
    <section className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        How ReelReview Works
      </h2>
      <p className="text-lg text-gray-800 text-center">
        Your personalized movie journey in three simple steps
      </p>
      <div className="grid grid-cols-3 gap-6">
        {
          steps.map(item=>
            (
              <div key={item.index} className="p-4 border border-gray-500 flex flex-col items-center">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            )
          )
        }
      </div>
    </section>
  );
};

export default HowItWorks;