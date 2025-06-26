import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";


const UpdateMovie = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [errors, setErrors] = useState({});


  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    // Fetch the movie data based on the ID when the component mounts
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://reelreview-backend.vercel.app/movies/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data);
        setRating(data.rating || 0);

      } catch (error) {
        console.error("Error fetching movie:", error);
        // Optionally redirect to an error page or display an error message
      }
    };

    fetchMovie();
  }, [id]);

  if (!movieData) {
    return <div className="min-h-screen flex flex-col justify-center items-center">Loading<span class="loading loading-spinner loading-lg"></span></div>; // Or a more informative loading state
  }


  const validateForm = (formElements) => {
    const newErrors = {};
    const getValue = (name) => formElements[name]?.value;

    // Movie Title validation
    if (!getValue('movieTitle')?.trim()) {
      newErrors.movieTitle = "Movie title is required";
    } else if (getValue('movieTitle').trim().length < 2) {
      newErrors.movieTitle = "Title must be at least 2 characters";
    }

    // URL validation
    try {
      new URL(getValue('moviePoster'));
    } catch {
      newErrors.moviePoster = "Please enter a valid URL";
    }

    // Genre validation
    if (getValue('genre') === "Select") {
      newErrors.genre = "Please select a genre";
    }

    // Duration validation
    if (!getValue('duration')) {
      newErrors.duration = "Duration is required";
    } else if (parseInt(getValue('duration')) < 60) {
      newErrors.duration = "Duration must be at least 60 minutes";
    }

    // Year validation
    if (!getValue('releaseYear')) {
      newErrors.releaseYear = "Release year is required";
    } else if (parseInt(getValue('releaseYear')) < 1888) {
      newErrors.releaseYear = "First movie was made in 1888!";
    } else if (parseInt(getValue('releaseYear')) > new Date().getFullYear() + 2) {
      newErrors.releaseYear = "Year cannot be in the far future";
    }

    // Rating validation
    if (rating <= 0) {
      newErrors.rating = "Please rate the movie";
    }

    // Summary validation
    if (!getValue('summary')?.trim()) {
      newErrors.summary = "Summary is required";
    } else if (getValue('summary').trim().length < 20) {
      newErrors.summary = "Summary must be at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    if (validateForm(formElements)) {
      // Form is valid - collect all updated values
      const updatedMovieData = {
        movieTitle: formElements.movieTitle.value,
        moviePoster: formElements.moviePoster.value,
        genre: formElements.genre.value,
        duration: formElements.duration.value,
        releaseYear: formElements.releaseYear.value,
        rating: rating,
        summaryTxt: formElements.summary.value,
      };

      try {
        const response = await fetch(`https://reelreview-backend.vercel.app/movies/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMovieData),
        });

        if (response.ok) {
          Swal.fire({
            title: "Updated!",
            text: "Movie successfully updated",
            icon: "success"
          });
          navigate('/'); // Redirect to the movie list page after successful update
        } else {
          const errorData = await response.json();
          console.error("Error updating movie:", errorData);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update movie information.',
            icon: 'error',
          })
        }
      } catch (error) {
        console.error("Error updating movie:", error);
        Swal.fire({
          title: 'Error!',
          text: 'An unexpected error occurred while updating.',
          icon: 'error',
        })
      }
    }
  };

  return (
    <main className="w-11/12 my-10 mx-auto">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset p-4 w-11/12 mx-auto">
          <legend className="fieldset-legend mx-auto text-3xl font-bold">
            Update Movie Info
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Movie title</label>
              <input
                type="text"
                className={`input w-full ${errors.movieTitle ? "border-red-500" : ""}`}
                name="movieTitle"
                placeholder="Title"
                defaultValue={movieData.movieTitle}
              />
              {errors.movieTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.movieTitle}</p>
              )}
            </div>
            <div>
              <label className="label">Movie Poster URL</label>
              <input
                type="url"
                className={`input w-full ${errors.moviePoster ? "border-red-500" : ""}`}
                placeholder="https://example.com/poster.jpg"
                name="moviePoster"
                defaultValue={movieData.moviePoster}
              />
              {errors.moviePoster && (
                <p className="text-red-500 text-sm mt-1">{errors.moviePoster}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="label">Select Genre</label>
              <select
                className={`select w-full ${errors.genre ? "border-red-500" : ""}`}
                name="genre"
                defaultValue={movieData.genre}
              >
                <option disabled value="Select">
                  Select
                </option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Documentary">Documentary</option>
                <option value="Thriller">Thriller</option>
              </select>
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
              )}
            </div>
            <div>
              <label className="label">Duration (minutes)</label>
              <input
                type="number"
                className={`input w-full ${errors.duration ? "border-red-500" : ""}`}
                placeholder="120"
                name="duration"
                min="60"
                defaultValue={movieData.duration}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Release Year</label>
              <input
                type="number"
                className={`input w-full ${errors.releaseYear ? "border-red-500" : ""}`}
                placeholder="2025"
                name="releaseYear"
                defaultValue={movieData.releaseYear}
                min="1888"
                max={new Date().getFullYear() + 2}
              />
              {errors.releaseYear && (
                <p className="text-red-500 text-sm mt-1">{errors.releaseYear}</p>
              )}
            </div>
            <div>
              <label className="label">Rating</label>
              <div><Rating
                initialValue={movieData?.rating}
                iconsCount={10}
                onClick={handleRatingClick}
                ratingValue={rating} // Use the direct 'rating' state
                allowHalfIcon
                allowFraction
                size={30}
                transition
                fillColor="palegreen"
                emptyColor="gray"
                className="star-rating"
                SVGstyle={{ display: "inline-block" }}
                numStars={10} // Set the total number of stars to 10
              /></div>
              
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Summary of Movie</label>
            <textarea
              className={`textarea w-full ${errors.summary ? "border-red-500" : ""}`}
              placeholder="Enter at least 20 characters"
              name="summary"
              defaultValue={movieData.summaryTxt}
            ></textarea>
            {errors.summary && (
              <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-neutral btn-wide mt-6 mx-auto"
          >
            Update Movie
          </button>
        </fieldset>
      </form>
    </main>
  );
};

export default UpdateMovie;