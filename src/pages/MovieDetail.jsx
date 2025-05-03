import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
  }, [id]);


  const handleDelete = (movieId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be removed from ReelReview",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/movies/${movieId}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "The movie has been deleted.",
              icon: "success",
              timer: 2500, // Automatically close after 1.5 seconds
              showConfirmButton: false
            }).then(() => {
              navigate('/movies');
            });
          })
          .catch(error => {
            console.error("Error deleting movie:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the movie.",
              icon: "error"
            });
          });
      }
    });
  };


  if (loading) return <div className="text-center p-8">Loading movie details...</div>;
  if (!movie) return <div className="text-center p-8">No movie data found</div>;

  return (
    <main className="w-8/12 mx-auto my-10">
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <img
            src={movie.moviePoster}
            alt={movie.movieTitle}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.movieTitle}</h1>
          <div className="flex gap-2 items-center mb-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded">
              Rating: {movie.rating}/10
            </span>
            <span>{movie.releaseYear} • {movie.duration} mins</span>
          </div>
          <div className="mb-4">
            {movie.genre.split(',').map((g, i) => (
              <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {g.trim()}
              </span>
            ))}
          </div>
          <p className="text-gray-700">{movie.summaryTxt}</p>
          <div className="flex gap-4 mt-4">
            <Link to="#" className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z" />
              </svg>
              Add to Favourites
            </Link>
            <button
              onClick={() => handleDelete(movie._id)} className="btn btn-secondary flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
              Delete Movie</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;