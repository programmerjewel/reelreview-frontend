import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AuthContext from "../context/AuthContext";

const FavoriteMovie = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user?.email) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://localhost:3000/favourites?userEmail=${user.email}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setFavoriteMovies(data);
        } catch (err) {
          console.error("Error fetching favorite movies:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setFavoriteMovies([]);
        setLoading(false);
      }
    };

    fetchUserFavorites();
  }, [user?.email]);

  const handleDeleteFavorite = async (favoriteId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be removed from your favorites",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/favourites/${favoriteId}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if ( data.deletedCount > 0) {
            Swal.fire({
              title: "Removed!",
              text: "The movie has been removed from your favorites.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            setFavoriteMovies(favoriteMovies.filter(fav => fav._id !== favoriteId));
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove the movie from favorites.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error deleting favorite:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove the movie from favorites.",
            icon: "error"
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="grid place-items-center h-100">
        <p className="text-center">Please Wait, <br />Loading your favorite movies...</p>
      </div>
    );
  }

  if (error) {
    return <div className="grid place-items-center h-100 text-red-500">Error loading favorites: {error}</div>;
  }

  if (favoriteMovies.length === 0) {
    return (
      <div className="grid place-items-center h-100">
        <p>You haven't added any movies to your favorites yet.</p></div>
    );
  }

  return (
    <main className=" w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Favorite Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favoriteMovies.map(favMovie => (
          <div key={favMovie._id} className="border border-gray-300 rounded-md p-4 bg-gray-50">
            <img
              src={favMovie.moviePoster}
              className="h-60 w-full object-cover rounded-md mb-2"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{favMovie.movieTitle}</h3>
              <p className="text-gray-600 text-sm">Genre: {favMovie.genre}</p>
              <p className="text-gray-600 text-sm">Duration: {favMovie.duration} mins</p>
              <p className="text-gray-600 text-sm">Release Year: {favMovie.releaseYear}</p>
              <p className="text-blue-500 text-sm">Rating: {favMovie.rating}/10</p>
            </div>
            
            <button
              onClick={() => handleDeleteFavorite(favMovie._id)}
              className="btn mt-3 btn-info"
            >
              <RiDeleteBin5Fill /> Delete Favorite
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FavoriteMovie;