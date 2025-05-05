import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function FeaturedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/featuredmovies')
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
    //hover:shadow-xl transition-shadow
  return (
    <section className='my-10 w-11/12 mx-auto'>
      <h2 className='text-center font-bold text-3xl mb-8'>Featured Movies</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          movies.map(movie => (
          <div 
            key={movie._id} 
            className="relative h-130 rounded-lg overflow-hidden"
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
                <div className="bg-color-one text-white p-2 rounded text-sm font-bold">
                  {movie.rating}
                </div>
              </div>
              
              <div className="badge mt-3">
                {movie. genre}
              </div>
              
              <p className="my-4 text-sm line-clamp-2">{movie.summaryTxt}</p>
              <Link  to={`/movies/${movie._id}`} className="btn btn-active">Details</Link>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'><Link to='/movies' className="btn btn-wide mt-6 btn-primary">See all movies</Link></div>
    </section>
  );
}

export default FeaturedMovies;