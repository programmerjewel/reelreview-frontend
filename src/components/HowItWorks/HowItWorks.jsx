

const HowItWorks = () => {

  const steps = [
    {
      icon: '🔍',  // or <SearchIcon className="w-6 h-6" />
      title: "Discover",
      text: "Browse our curated collection of films across genres, ratings, and release years."
    },
    {
      icon: '📌',  // or <BookmarkIcon />
      title: "Save & Organize",
      text: "Save favorites to your watchlist, rate movies you’ve watched."
    },
    {
      icon: '🎯',  // or <RecommendationIcon />
      title: "Get Recommendations",
      text: "AI and our community suggests films based on your preferences."
    }
  ];
  return (
    <section className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold mb-3 text-center">
        How ReelReview Works
      </h2>
      <p className="text-lg text-gray-800 text-center">
        Your personalized movie journey in three simple steps
      </p>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {
          steps.map((item, index)=>
            (
              <div key={index} className="p-8 border border-gray-200 dark:border-green-600 rounded-lg flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-center">{item.text}</p>
              </div>
            )
          )
        }
      </div>
    </section>
  );
};

export default HowItWorks;