import { useState, useEffect } from 'react';


// "_id": "6813a8fd3e05dba12db88d34",
//     "moviePoster": "https://i.ibb.co.com/PzG0DXX3/duneparttwo.jpg",
//     "movieTitle": "Dune: Part 2",
//     "genre": "Sci-Fi",
//     "duration": "134",
//     "releaseYear": "2023",
//     "rating": "9.0",
//     "summaryTxt": "The saga continues as Paul Atreides embraces his destiny on the desert planet Arrakis. Political intrigue intensifies as factions battle for control of the precious spice melange. Visually breathtaking with stellar performances, this sequel expands Frank Herbert's epic universe with stunning grandeur."
//   },


const AllMovies = () => {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/allmovies');
        
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <main>
      <h2>All Movies</h2>
      <div className='grid grid-cols-3 gap-4'>
        {
          movies.map(movie => (
            <div key={movie._id} className='border border-red-600 p-4'>
              <h3 className='text-lg font-semibold'>{movie.movieTitle}</h3>
              <p>{movie.genre}</p>
              <p></p>
              <p></p>
              <p></p>
              <img src={movie.moviePoster} alt="" />
              <button></button>
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default AllMovies;