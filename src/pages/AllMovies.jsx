import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const AllMovies = () => {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/movies');
        await new Promise(resolve => setTimeout(resolve, 1000));
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
    return <div className="text-center py-10 flex flex-col gap-3 justify-center items-center my-30">
            <p>Loading</p>
            <span className="loading loading-spinner loading-xl"></span>
          </div>
    };
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <main className='w-11/12 mx-auto my-10'>
      <h2 className='text-3xl text-center font-bold my-6'>All Movies</h2>
      <div className='grid grid-cols-3 gap-6'>
        {
          movies.map(movie => (
            <div key={movie._id} className='p-4 border border-gray-300 rounded-md flex flex-col gap-4'>
              <img src={movie.moviePoster} className='w-full h-90 object-cover rounded-md' alt="" />
              <div className=''>
                <h3 className='text-xl font-semibold mb-2'>{movie.movieTitle}</h3>
                <p><strong>Genre: </strong>{movie.genre}</p>
                <p><strong>Release Year: </strong>{movie.releaseYear}</p>
                <p><strong>Rating: </strong>{movie.rating}/10</p>
                <p className='line-clamp-3'>{movie.summaryTxt}</p>
                <Link className='btn btn-primary mt-3' to={`/movies/${movie._id}`}>Details</Link></div>
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default AllMovies;