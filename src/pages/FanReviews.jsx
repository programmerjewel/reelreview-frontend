const FanReviews = () => {
  const reviewsData = [
    {
      id: 1,
      userName: "MovieBuff42",
      profileImg: "https://i.ibb.co/6JFfTzKy/Man-4.png",
      date: "2023-11-15",
      reviewTitle: "A Cinematic Masterpiece of Historical Storytelling",
      reviewTxt:
        "Christopher Nolan's 'Oppenheimer' is nothing short of spectacular. Cillian Murphy delivers a career-defining performance as the conflicted father of the atomic bomb. The film's non-linear narrative structure keeps you engaged, while the practical effects for the Trinity test sequence are breathtaking. What impressed me most was how Nolan managed to make a three-hour dialogue-heavy film feel so intensely gripping. The supporting cast, especially Robert Downey Jr. as Lewis Strauss, adds tremendous depth. The score by Ludwig Göransson perfectly complements the tension throughout. While some scientific concepts might go over casual viewers' heads, the emotional weight of Oppenheimer's moral dilemma comes through powerfully. This is undoubtedly one of the best biopics I've ever seen.",
      rating: 9,
      movieName: "Oppenheimer",
      movieReleaseYear: 2023,
    },
    {
      id: 2,
      userName: "CinemaQueen",
      profileImg: "https://i.ibb.co/NgQLPpvW/Woman-1.png",
      date: "2023-11-10",
      reviewTitle: "A Colorful Satire That Doesn't Quite Stick the Landing",
      reviewTxt:
        "Greta Gerwig's 'Barbie' is visually stunning and packed with clever humor, though it struggles with tonal consistency. Margot Robbie is perfect as Stereotypical Barbie, bringing both comedy and pathos to the role. The production design is some of the best I've seen this year - every frame of Barbieland pops with vibrant colors and creative details. Ryan Gosling steals every scene as Ken, especially during his musical numbers. Where the film falters is in its attempt to balance social commentary with mainstream entertainment. The feminist monologue, while well-intentioned, feels tacked on and disrupts the flow. Still, it's an ambitious film that's mostly successful at being both thought-provoking and entertaining.",
      rating: 7,
      movieName: "Barbie",
      movieReleaseYear: 2023,
    },
    {
      id: 3,
      userName: "FilmCritic101",
      profileImg: "https://i.ibb.co/VYjqGGBz/Man-20.png",
      date: "2023-11-05",
      reviewTitle: "A Worthy Successor to the Horror Classic",
      reviewTxt:
        "As someone who holds the original 'Exorcist' in the highest regard, I approached 'Believer' with skepticism. To my surprise, David Gordon Green has crafted a sequel that respects its source material while bringing fresh scares. The dual possession concept adds new tension, and the young actresses deliver remarkably disturbing performances. What makes this film work is its emphasis on psychological horror rather than relying on gore. The scenes of the girls speaking in unison still haunt me days later. While it doesn't reach the artistic heights of Friedkin's original, it's miles better than most modern horror sequels. The climax in the jungle is particularly effective, with cinematography that makes you feel the characters' desperation.",
      rating: 8,
      movieName: "The Exorcist: Believer",
      movieReleaseYear: 2023,
    },
    {
      id: 4,
      userName: "ScreenSiren",
      profileImg: "https://i.ibb.co/NdK9pYGD/Man-18.png",
      date: "2023-10-28",
      reviewTitle: "Tom Cruise Defies Gravity (and Aging) Once Again",
      reviewTxt:
        "The seventh 'Mission: Impossible' installment delivers exactly what fans expect - death-defying stunts, intricate plotting, and Tom Cruise's relentless commitment to practical effects. The much-publicized motorcycle cliff jump is every bit as thrilling as promised, but what surprised me were the quieter character moments between Ethan and Ilsa. Hayley Atwell is a wonderful addition to the cast, bringing both humor and chemistry with Cruise. My only complaint is the film's length - at nearly 3 hours, some of the exposition scenes drag. The train sequence in the third act is one of the most spectacular action set pieces I've seen in years. While not as tight as 'Fallout,' this proves the franchise still has plenty of gas in the tank.",
      rating: 8,
      movieName: "Mission: Impossible - Dead Reckoning Part One",
      movieReleaseYear: 2023,
    },
    {
      id: 5,
      userName: "ReelWatcher",
      profileImg: "https://i.ibb.co/q34kMKqw/Man-15.png",
      date: "2023-10-20",
      reviewTitle: "Pixar's Most Visually Stunning Film Since 'Coco'",
      reviewTxt:
        "'Elemental' is a triumph of animation technology and heartfelt storytelling. The way the artists have brought the four elements to life is nothing short of magical - the fire characters especially glow with such realism. At its core, this is a touching immigrant story disguised as a fantasy romance. The central relationship between Ember and Wade develops beautifully, with genuine emotional beats that had me tearing up. While the plot follows some predictable Pixar patterns, the world-building is so rich that it doesn't matter. The scene where Ember shows Wade her family's neighborhood is one of the most beautiful sequences in Pixar history. It may not reach the studio's absolute peaks, but it's a return to form after some recent disappointments.",
      rating: 9,
      movieName: "Elemental",
      movieReleaseYear: 2023,
    },
  ];
  return (
    <section className="mx-auto w-11/12 my-10">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-950 dark:text-white">
          Movie Reviews
        </h1>
        <p className="text-base-content/70 mt-2">
          What people are saying about recent films
        </p>
      </div>

      <div className="space-y-6">
        <div className="w-10/12 mx-auto grid grid-cols-2 gap-4">
          {reviewsData.map((review) => (
            <div key={review.id} className="border border-gray-200 dark:border-gray-600 rounded-sm">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={review.profileImg} alt={review.userName} />
                    </div>
                  </div>
                  <div>
                    <h2 className="card-title">{review.reviewTitle}</h2>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium ">
                        From{" "}
                        <span className="italic text-prussian-blue dark:text-pale-white">
                          {review.userName}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="mt-4 font-semibold text-blue-950 dark:text-white/90">
                  {review.movieName}
                </div>

                <p className="mt-3 text-base-content/80">{review.reviewTxt}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span>Personal Rating: </span>
                  <div className="rating rating-xs">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={i === Math.floor(review.rating / 2)}
                        readOnly
                      />
                    ))}
                  </div>
                  <span className="text-sm">{review.rating}/10</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <span className="text-sm text-base-content/50 italic">
                    Reviewed on {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FanReviews;
