

const HowItWorks = () => {

  const steps = [
    {
      icon: '🔍',
      title: "Discover",
      text: "Browse our curated collection of films across genres, ratings, and release years."
    },
    {
      icon: '📌',
      title: "Save & Organize",
      text: "Save favorites to your watchlist, rate movies you’ve watched."
    },
    {
      icon: '🎯',
      title: "Get Recommendations",
      text: "AI and our community suggests films based on your preferences."
    }
  ];
  return (
    <section className="w-10/12 mx-auto my-12">
      <h2 className="md:text-4xl text-2xl font-bold mb-2 text-center text-blue-950 dark:text-amber-50">
        How ReelReview Works
      </h2>
      <p className="text-md text-center">
        Your personalized movie journey in three simple steps
      </p>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
        {
          steps.map((item, index)=>
            (
              <div key={index} className="md:p-8 p-4 border border-gray-200 dark:border-gray-600 rounded-lg flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-bold text-lg text-gray-800 dark:text-amber-50">{item.title}</h3>
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