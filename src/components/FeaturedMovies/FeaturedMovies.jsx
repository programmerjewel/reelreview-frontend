import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineStar } from "react-icons/md";



function FeaturedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch('https://reelreview-backend.vercel.app/featuredmovies')
    .then(res => res.json())
    .then(data => {
      setMovies(data)
      setLoading(false)
    })
  }, []);

  if (loading) {
    return <div className="text-center py-10 flex justify-center my-30">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
    };
  return (
    <section className='my-12 w-10/12 mx-auto'>
      <h2 className='text-center font-bold md:text-4xl text-2xl mb-2 text-blue-950 dark:text-white'>Featured Movies</h2>
      <p className='text-center'>Explore some of the popular and featured movies on ReelReview</p>
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          movies.map(movie => (
          <div 
            key={movie._id} 
            className="relative h-130 rounded-lg overflow-hidden p-2"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${movie.moviePoster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/50 backdrop-blur-2xl">
              <h3 className='text-xl font-bold text-white/90'>{movie.movieTitle}</h3>
              <div className='flex justify-between items-center'>
                <p className="text-sm italic font-light">{movie.releaseYear} • {movie.duration} mins</p>
                <div className="flex items-center gap-1 p-1.5 font-semibold bg-white/80 border-0 text-black text-sm rounded-lg">
                  <MdOutlineStar className='text-yellow-600' />{movie.rating}
                </div>
              </div>
              <p className="my-4 text-sm line-clamp-2 font-light">{movie.summaryTxt}</p>
              <Link to={`/movies/${movie._id}`} className="btn bg-red-500 text-white shadow-none border-none hover:bg-red-700 transition duration-300">Details</Link>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'><Link to='/movies' className="btn bg-red-500 text-white btn-wide mt-6 shadow-none border-none hover:bg-red-700 transition duration-300">See all movies</Link></div>
    </section>
  );
}

export default FeaturedMovies;