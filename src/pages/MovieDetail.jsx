import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import AuthContext from "../context/AuthContext";

const MovieDetail = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetailsAndCheckFavorite = async () => {
      setLoading(true);
      try {
        const movieResponse = await fetch(`https://reelreview-backend.vercel.app/movies/${id}`);
        if (!movieResponse.ok) {
          throw new Error(`Failed to fetch movie details: ${movieResponse.status}`);
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        if (user?.email && movieData?._id) {
          const favoritesResponse = await fetch(`https://reelreview-backend.vercel.app/favourites?userEmail=${user.email}`);
          if (!favoritesResponse.ok) {
            throw new Error(`Failed to fetch favorites: ${favoritesResponse.status}`);
          }
          const favorites = await favoritesResponse.json();
          const alreadyFavorite = favorites.some(fav => fav.movieId === movieData._id);
          setIsFavorite(alreadyFavorite);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error fetching details or checking favorite:", error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetailsAndCheckFavorite();
  }, [id, user?.email]); // Only depend on id and user?.email

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
        fetch(`https://reelreview-backend.vercel.app/movies/${movieId}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "The movie has been deleted.",
              icon: "success",
              timer: 1000,
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

  const handleFavourites = (movieData) => {
    if (isFavorite) {
      Swal.fire({
        icon: 'info',
        title: 'Already in Favourites!',
        text: 'This movie is already in your favorites list.',
        timer: 1500,
      });
      return;
    }

    fetch('https://reelreview-backend.vercel.app/favourites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: movieData._id,
        userEmail: user.email,
        movieTitle: movieData.movieTitle,
        moviePoster: movieData.moviePoster,
        genre: movieData.genre,
        duration: movieData.duration,
        releaseYear: movieData.releaseYear,
        rating: movieData.rating,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Added to Favourites!',
            showConfirmButton: false,
            timer: 1000,
          })
          .then(() => setIsFavorite(true));
        } 
        else if (data.message === 'Movie is already in your favorites') {
          Swal.fire({
            icon: 'info',
            title: 'Already in Favourites!',
            text: 'This movie is already in your favorites list.',
            timer: 1000,
          });
          setIsFavorite(true);
        } 
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while adding to favorites!',
          });
        }
      })
      .catch(error => {
        console.error('Error adding to favorites:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding to favorites!',
        });
      });
  };

  if (loading) return <div className="text-center flex flex-col gap-3 justify-center items-center my-12">
        <p>Loading</p>
        <span className="loading loading-spinner loading-xl"></span>
      </div>;
  if (!movie) return <div className="flex flex-col gap-3 justify-center items-center my-12">No movie data found</div>;

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
          <div className="mb-4 badge bg-gray-200 dark:bg-white/15 dark:text-white/80">
            {movie.genre}
          </div>
          <div className="flex gap-2 mb-4 flex-col">
            <span><strong>Released Year: </strong>{movie.releaseYear}</span>
            <span><strong>Runtime: </strong>{movie.duration} mins</span>
            <span><strong>Rating:</strong> {movie.rating}/10</span>
          </div>
          <p className="text-gray-700 dark:text-white font-light">{movie.summaryTxt}</p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              className={`btn ${isFavorite ? 'btn-disabled text-gray-800' : 'bg-blue-950 text-white'} flex items-center gap-1`}
              onClick={() => handleFavourites(movie)}
              disabled={isFavorite}
            >
              <BsFillBookmarkStarFill />
              {isFavorite ? 'Added to Favourites' : 'Add to Favourites'}
            </button>
            <Link to={`/update/${id}`} className="btn btn-outline"><FiEdit />Update Info</Link>
            <Link
              onClick={() => handleDelete(movie._id)}
              className="btn bg-red-500 flex items-center gap-1 text-white"
            >
              <RiDeleteBin5Fill />
              Delete Movie
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;