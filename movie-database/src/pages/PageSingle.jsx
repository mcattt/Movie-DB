// Page - Single Movie
import { Rate } from "antd";
import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";
import { Link, Navigate, useParams } from "react-router-dom";
import CastInfo from "../components/CastInfo";
import VideoTrailer from "../components/VideoTrailer";
import isFav from "../utilities/isFav";
import FavButton from "../components/FavButton";
import { addFav, deleteFav } from "../features/favs/favsSlice"; // Import addFav and deleteFav
import { useSelector, useDispatch } from "react-redux";
import favClip from "/assets/images/clip-mark.png";
import Loading from "../components/Loading";

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
  const favs = useSelector((state) => state.favs.items);
  const [selectedSingleMovie, setSelectedSingleMovie] = useState("");
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect (() => {
    const fetchSingleMovie = async () => {
      const apiUrl = `${endPointThemes}${movieId}?append_to_response=videos,credits`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZkZTJkYmVmZjc0MzVkYWIxMzE3NDFlNmFhYTRlZCIsInN1YiI6IjY0ZWUxODhhNGNiZTEyMDEzODlkNWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wP7biHdlHFHu3vEQP1oq3lEjZYVWDt9pWBVv1-YYihU",
        },
      };
      const res = await fetch(apiUrl, options);
      if (res.ok) {
        let data = await res.json();
        setSelectedSingleMovie(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
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

  // Dispatch to add/ remove fav movies

  const dispatch = useDispatch();

  function handleFavClick(isFav, obj) {
    if (isFav === true) {
      dispatch(addFav(obj));
    } else {
      dispatch(deleteFav(obj));
    }
  }

  // Provide info to isFav function, then use later to check if the selected movie is favourited or not

  const isFavourite = isFav(favs, null, selectedSingleMovie.id);

  console.log(selectedSingleMovie);

  return (
    <>
    {isLoaded ? (
    <section className="single-movie lg:relative">
      {selectedSingleMovie &&  (
        <>
        <div className="relative mb-20 lg:static">
          {/* Movie Backdrop */}
          {selectedSingleMovie.backdrop_path && (
            <img src={`https://image.tmdb.org/t/p/w1280${selectedSingleMovie.backdrop_path}`} 
            alt={selectedSingleMovie.title} 
            className="opacity-20 w-full absolute h-[550px] object-cover top-0 lg:h-full lg:opacity-10"
            />
            )}
            
                {selectedSingleMovie.poster_path && (
                  <div className="relative w-[300px] mx-auto inset-x-0 top-[55px]">
                 {/* Movie Poster */}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${selectedSingleMovie.poster_path}`}
                    alt={selectedSingleMovie.title}
                    className="rounded-lg shadow-[0px_0px_60px_10px_#420B5B] z-10 mx-auto top-[50px]"
                  />
                  {/* Movie Clip Mark */}
                  {isFavourite && (
                    <img className="absolute w-[30px] top-[-25px] right-4 z-20" src={favClip}></img>
                  )}
              </div>
                  )}
  
        </div>
        <section className="Movie-info mx-5 relative z-10">
          {/* Movie Rating */}
          <div className="movie-rating flex justify-between w-[300px] mx-auto">
            {selectedSingleMovie.vote_average && (
              <>
                <div className="flex">
                  <Rate
                    defaultValue={selectedSingleMovie.vote_average / 2}
                    allowHalf
                    disabled
                  />
                </div>
                <div className="flex items-center">
                  <p className="bg-green-300 text-xl w-9 h-7 text-dark-purple rounded-md text-center">
                    {selectedSingleMovie.vote_average.toFixed(1)}
                  </p>
                </div>
              </>
            )}
          </div>
          {/* Movie Title */}
          <h2 className="text-2xl font-bold">{selectedSingleMovie.title}</h2>
         
          {/* Add/ Remove Fav button */}
          <div>
            {isFavourite ? (
              <div>
                <FavButton
                  movie={selectedSingleMovie}
                  remove={true}
                  handleFavClick={handleFavClick}
                />
              </div>
          ) : (
              <FavButton movie={selectedSingleMovie} handleFavClick={handleFavClick} />
        )}
          </div>
          {/* Movie Date and Runtime */}
          <p className="italic">
            {movieDate} - {movieHours}h {movieMinutes}m
          </p>

          {/* Movie Genres */}
          <p>
            {selectedSingleMovie.genres &&
              selectedSingleMovie.genres.map((genre, index) => (
                <span className="font-bold" key={genre.id}>{genre.name}{index < selectedSingleMovie.genres.length - 1 ? ", " : ""} </span>
              ))}
          </p>
          {/* Video Trailer */}
          {selectedSingleMovie.videos?.results ? 
            <VideoTrailer videos={selectedSingleMovie.videos.results}/> : 
            <p>Official Trailer Not Available</p>
          }
          {/* Tagline */}
          <p className="italic text-[#D5C1E0]">{selectedSingleMovie.tagline}</p>
          {/* Movie Overview */}
          <h3 className="font-bold">Overview</h3>
          <p>{selectedSingleMovie.overview}</p>
          {/* Movie Cast */}
          {selectedSingleMovie && selectedSingleMovie.credits && (
            <CastInfo cast={selectedSingleMovie.credits.cast} />
          )}
      </section>
      
      </>
      )}
      
    </section>
    ) : (
      <Loading />
    )}
    </>
  );
};

export default PageSingle;
