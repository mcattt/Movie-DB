// Page - Single Movie
import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";
import { Navigate, useParams } from "react-router-dom";
import CastInfo from "../components/CastInfo";
import VideoTrailer from "../components/VideoTrailer";
import isFav from "../utilities/isFav";
import FavButton from "../components/FavButton";
import { addFav, deleteFav } from "../features/favs/favsSlice"; // Import addFav and deleteFav
import { useSelector, useDispatch } from "react-redux";
import favClip from "/assets/images/clip-mark.png";
import Loading from "../components/Loading";
import StarRating from "../components/StarRating";

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

  useEffect(() => {
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
  let movieDate;
  if (selectedSingleMovie.release_date) {
    movieDate = new Date(selectedSingleMovie.release_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    movieDate = 'Release date unavailable';
  }

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

  return (
    <>
    {isLoaded ? (
    <section className="single-movie md:grid md:grid-cols-[40%_60%]">
      {selectedSingleMovie &&  (
        <>
        <div className="relative mb-14 md:static xl:row-[1_/_3]">
          {/* Movie Backdrop */}
          {selectedSingleMovie.backdrop_path && (
            <img src={`https://image.tmdb.org/t/p/w1280${selectedSingleMovie.backdrop_path}`} 
            alt={selectedSingleMovie.title} 
            className="opacity-20 w-full absolute h-[550px] object-cover top-0 md:h-full md:opacity-10 "
            />
            )}
            
                {selectedSingleMovie.poster_path && (
                  <div className="relative w-[300px] mx-auto inset-x-0 top-[45px] xl:w-[460px]">
                    {/* Movie Poster */}
                    <img
                      src={`https://image.tmdb.org/t/p/original${selectedSingleMovie.poster_path}`}
                      alt={selectedSingleMovie.title}
                      className="w-[300px] rounded-lg shadow-[0px_0px_60px_10px_#420B5B] z-10 mx-auto top-[50px] md:ml-8 xl:ml-0 xl:w-[460px] "
                    />
                    {/* Movie Clip Mark */}
                    {isFavourite && (
                      <img
                        className="absolute w-[30px] top-[-25px] right-4 z-20"
                        src={favClip}
                      ></img>
                    )}
                  </div>
                )}
              </div>
              <section className="Movie-info mx-5 relative z-10 md:top-[50px] md:mx-14 xl:static xl:mt-[45px] 2xl:ml-0">
                {/* Movie Rating */}
                <div className="movie-rating mx-auto my-0 flex min-[350px]:w-[300px] md:m-0 md:block">
                  {selectedSingleMovie.vote_average ? (
                    <>
                      <div className="flex">
                        <StarRating vote_average={selectedSingleMovie.vote_average} />
                      </div>
                      <div className="flex items-center ml-auto md:mt-2">
                        <p className="bg-green-300 text-xl w-9 h-7 text-dark-purple rounded-md text-center">
                          {selectedSingleMovie.vote_average.toFixed(1)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex">
                        <StarRating vote_average={undefined} />
                      </div>
                  )}
                </div>
                <div className="title-add-button-wrapper flex justify-between mt-8 md:mt-4 md:max-w-[540px]">
                  {/* Movie Title */}
                  <h2 className="text-2xl font-bold self-center w-[80%]">{selectedSingleMovie.title}</h2>

                  {/* Add/ Remove Fav button */}
                  <div className="self-center">
                    {isFavourite ? (
                        <FavButton
                          movie={selectedSingleMovie}
                          remove={true}
                          handleFavClick={handleFavClick}
                        />
                    ) : (
                      <FavButton
                        movie={selectedSingleMovie}
                        handleFavClick={handleFavClick}
                      />
                    )}
                  </div>
                </div>
                {/* Movie Date and Runtime */}
                {selectedSingleMovie.runtime ? (
                  <p className="italic font-extralight">
                    {movieDate} - {movieHours}h {movieMinutes}m
                  </p>
                ) : (
                  <p className="italic font-extralight">
                  {movieDate}
                </p>
                )}

          {/* Movie Genres */}
          
          {selectedSingleMovie.genres && 
          <p className="my-2">
            {selectedSingleMovie.genres
              .map((genre) => genre.name)
              .join(", ")}
          </p>}
        
          {/* Video Trailer */}
          {selectedSingleMovie.videos?.results ? 
            <VideoTrailer videos={selectedSingleMovie.videos.results}/> : 
            <p className="italic font-extralight text-light-purple">Official Trailer - Not Available</p>
          }
          {/* Tagline */}
          {selectedSingleMovie.tagline &&
           <p className="italic font-extralight text-light-purple my-4">
              {selectedSingleMovie.tagline}
            </p>
          }
          {/* Movie Overview */}
          {selectedSingleMovie.overview && 
            <>
              <h3 className="font-bold mb-2 text-xl">Overview</h3>
              <p className="xl:max-w-[90%]">{selectedSingleMovie.overview}</p> 
            </>
          }
      </section>
          {/* Movie Cast */}
          {selectedSingleMovie && selectedSingleMovie.credits && (
            <CastInfo cast={selectedSingleMovie.credits.cast} />
          )}
      
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
