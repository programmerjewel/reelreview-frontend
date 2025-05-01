// src/components/FeedbackSection.jsx
import Marquee from "react-fast-marquee";

const FeedbackSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emma S.",
      role: "Film Critic",
      text: "The most intuitive movie database I've used. Saves me hours of research!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 2,
      name: "James P.",
      role: "Documentary Fan",
      text: "Found 10+ niche films I couldn't locate anywhere else. Brilliant!",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 3,
      name: "Aisha M.",
      role: "Film Student",
      text: "Community reviews helped me understand cinematography techniques.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/41.jpg"
    },
    {
      id: 4,
      name: "Carlos R.",
      role: "Indie Filmmaker",
      text: "Our short film got genuine feedback here, unlike other platforms.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  return (
    <section className="py-16 bg-base-200" id="testimonials">
      <div className="">
        <h2 className="text-3xl font-bold text-center mb-2">Community Feedback</h2>
        <p className="text-center mb-12 text-lg opacity-80">
          Hear from real users who love ReelReview
        </p>

        <Marquee 
          speed={50} 
          autoFill
        >
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className="p-4 bg-gray-50 rounded-xl w-80 text-center border border-black mx-4"
            >
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={item.avatar} alt={item.name} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm opacity-70">{item.role}</p>
                </div>
              </div>
              
              {/* DaisyUI Rating */}
              <div className="rating rating-sm mb-3">
                {[...Array(5)].map((_, i) => (
                  <input 
                    key={i}
                    type="radio" 
                    name={`rating-${item.id}`} 
                    className="mask mask-star-2 bg-primary" 
                    checked={i < item.rating}
                    readOnly
                  />
                ))}
              </div>
              
              <blockquote className="italic opacity-90">
                "{item.text}"
              </blockquote>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default FeedbackSection;