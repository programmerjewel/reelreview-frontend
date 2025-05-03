import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function FeaturedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/featuredmovies');
        
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  if (loading) {
    return <div className="text-center py-10 flex justify-center my-30">
            <span className="loading loading-spinner loading-xl"></span>
            <span className="loading loading-spinner loading-xl"></span>
            <span className="loading loading-spinner loading-xl"></span>
          </div>
    };
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    //hover:shadow-xl transition-shadow
  return (
    <section className='my-10 w-11/12 mx-auto'>
      <h2 className='text-center font-bold text-3xl mb-8'>Featured Movies</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {movies.map(movie => (
          <div 
            key={movie._id} 
            className="relative h-100 rounded-lg overflow-hidden"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${movie.moviePoster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-white/20 backdrop-blur-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className='text-xl font-bold'>{movie.movieTitle}</h3>
                  <p className="text-sm">{movie.releaseYear} • {movie.duration} mins</p>
                </div>
                <div className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                  {movie.rating}
                </div>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {movie.genre.split(',').map((genre, index) => (
                  <span 
                    key={index} 
                    className="bg-black px-2 py-1 rounded-full text-xs"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
              
              <p className="mt-3 text-sm line-clamp-2 mb-4">{movie.summaryTxt}</p>
              <button className="btn btn-secondary">Details</button>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'><Link to='/movies' className="btn btn-wide mt-6 btn-secondary">See all movies</Link></div>
    </section>
  );
}

export default FeaturedMovies;