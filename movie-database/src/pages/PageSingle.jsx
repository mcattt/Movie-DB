// Page - Single Movie
import { Rate } from "antd";
import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";
import { Link, Navigate, useParams } from "react-router-dom";
import CastInfo from "../components/CastInfo";
import VideoTrailer from "../components/VideoTrailer";

const endPointThemes = `https://api.themoviedb.org/3/movie/`;

// set image folder path using environment variable path to the public folder
// const imageFolderPath = process.env.PUBLIC_URL + "/assets/images/";

const PageSingle = () => {
  let { movieId } = useParams();
  useEffect(() => {
    document.title = `${appTitle} - Single Movie ${movieId}`;
  }, [movieId]);

  movieId = movieId * 1;

  // Make sure id is a whole number between 1 and 6 (inclusive)
  // ...If is not...then send them back to the Portfolio page
  if (isNaN(movieId) || movieId % 1 !== 0) {
    return <Navigate to="/" replace={true} />;
  }

  const [selectedSingleMovie, setSelectedSingleMovie] = useState("");

  const fetchSingleMovie = async () => {
    const apiUrl = `${endPointThemes}${movieId}?append_to_response=videos,credits`;
    console.log(apiUrl);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZkZTJkYmVmZjc0MzVkYWIxMzE3NDFlNmFhYTRlZCIsInN1YiI6IjY0ZWUxODhhNGNiZTEyMDEzODlkNWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wP7biHdlHFHu3vEQP1oq3lEjZYVWDt9pWBVv1-YYihU",
      },
    };

    const res = await fetch(apiUrl, options);
    let data = await res.json();
    console.log(data);

    setSelectedSingleMovie(data);
  };

  useEffect(() => {
    fetchSingleMovie();
  }, []);

  // Calculate the hours and minutes
  const movieHours = Math.floor(selectedSingleMovie.runtime / 60);
  const movieMinutes = selectedSingleMovie.runtime % 60;
  // Format date release
  const movieDate = new Date(
    selectedSingleMovie.release_date
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  return (
    <section className="single-movie">
      {selectedSingleMovie &&  (
        <>
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w300${selectedSingleMovie.poster_path}`}
        alt={selectedSingleMovie.title}
        className="rounded-lg shadow-[0px_0px_60px_10px_#420B5B]"
      />
      {/* Movie Rating */}
      <div className="movie-rating">
        {selectedSingleMovie.vote_average && (
          <>
            <div className="flex">
              <Rate
                defaultValue={selectedSingleMovie.vote_average / 2}
                allowHalf
                disabled
              />
            </div>
            <div className="flex items-center ml-auto">
              <p className="bg-green-300 text-xl w-9 h-7 text-dark-purple rounded-md text-center">
                {selectedSingleMovie.vote_average.toFixed(1)}
              </p>
            </div>
          </>
        )}
      </div>
      {/* Movie Title */}
      <h2>{selectedSingleMovie.title}</h2>
      {/* Movie Date and Runtime */}
      <p>
        {movieDate} - {movieHours}h {movieMinutes}m
      </p>

      {/* Movie Genres */}
      <p>
        {selectedSingleMovie.genres &&
          selectedSingleMovie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}, </span>
          ))}
      </p>
      {/* Video Trailer */}
      {selectedSingleMovie.videos.results ? 
        <VideoTrailer videos={selectedSingleMovie.videos.results}/> : 
        <p>Official Trailer Not Available</p>
      }
      {/* Tagline */}
      <p className="italic text-[#D5C1E0]">{selectedSingleMovie.tagline}</p>
      {/* Movie Overview */}
      <h3>Overview</h3>
      <p>{selectedSingleMovie.overview}</p>
      {/* Movie Cast */}
      {selectedSingleMovie && selectedSingleMovie.credits && (
        <CastInfo cast={selectedSingleMovie.credits.cast} />
      )}
      </>
      )}
      
    </section>
  );
};

export default PageSingle;
