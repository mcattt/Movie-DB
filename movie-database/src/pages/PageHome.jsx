import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";
import { useSelector, useDispatch } from "react-redux";
import isFav from "../utilities/isFav";
import { increment } from '../features/more/viewMoreSlice';
import { resetCount } from '../features/more/viewMoreSlice';
const apiKey = "499d34c8aaf241d4909feaf69a3c37c1";
const endPointThemes = `https://api.themoviedb.org/3/movie/`;
const categories = [
  { filter: "popular", name: "Popular" },
  { filter: "now_playing", name: "Now Playing" },
  { filter: "top_rated", name: "Top Rated" },
  { filter: "upcoming", name: "Upcoming" },
];
// const [filter, setFilter] = useState['now_playing'];

const PageHome = () => {
  const [movieList, setMovieList] = useState([]);
  // Next 2 variables are for getting the hero movie
  const [selectedBackdrop, setSelectedBackdrop] = useState(""); // State variable to hold the selected backdrop path
  const [selectedMovie, setSelectedMovie] = useState(""); // State variable to hold the selected Movie path
  const [initialized, setInitialized] = useState(false); // Initialize as false

  const favs = useSelector((state) => state.favs.items);

  const count = useSelector((state) => state.viewMore.count); // Get the count from Redux state

  const fetchMovie = async (filter) => {
    const apiUrl = `${endPointThemes}${filter}?api_key=${apiKey}`;
    console.log("Fetching data from URL:", apiUrl); // Log the URL
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZkZTJkYmVmZjc0MzVkYWIxMzE3NDFlNmFhYTRlZCIsInN1YiI6IjY0ZWUxODhhNGNiZTEyMDEzODlkNWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wP7biHdlHFHu3vEQP1oq3lEjZYVWDt9pWBVv1-YYihU",
      },
    };

    const res = await fetch(
      `${endPointThemes}${filter}?api_key=${apiKey}`,
      options
    );
    let data = await res.json();

    let shortList = data.results.slice(0, count);

    console.log({ data });

    console.log(shortList);
    setMovieList(shortList);
  };

  useEffect(() => {
    document.title = `${appTitle} - Home`;
    fetchMovie("popular");
  }, []);

  useEffect(() => {
    if (!initialized) {
      // Check if movieList is not empty and select a random movie
      if (movieList.length > 0) {
        const randomIndex = Math.floor(Math.random() * movieList.length);
        const randomMovie = movieList[randomIndex];
        setSelectedMovie(randomMovie);
        setSelectedBackdrop(randomMovie.backdrop_path);
        setInitialized(true); // Set initialized to true to prevent further changes
      }
    }
  }, [movieList, initialized]);

  const filterMovies = (filter) => {
    fetchMovie(filter);
  };

  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const showMore = () => {
    dispatch(increment()); // Dispatch the increment action to update count in Redux
    console.log(count);
  };

  return (
    <section>
      <div className="hero-image">
        {selectedBackdrop && ( // Check if a backdrop is selected
          <div className="relative max-h-[90vh]">
            {/* Backdrop Image */}
            <img
              className="opacity-20 max-h-[90vh] w-full object-cover object-center"
              src={`https://image.tmdb.org/t/p/original${selectedBackdrop}`}
              alt="Backdrop"
            />
            {/* This div is for the movie Date, Title, and Overview */}
            <div className="info-container flex justify-around absolute bottom-[60px] w-full">
              <div className="max-w-xl">
                <h4 className="text-light-purple text-1xl mb-2 italic">
                  {new Date(selectedMovie.release_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </h4>
                <h3 className="text-light-purple font-bold text-4xl">
                  {selectedMovie.title}
                </h3>
                <p className="text-light-purpletext-2xl mt-6">
                  {selectedMovie.overview}
                </p>
              </div>
              <div className="justify-end">
                <div className="flex justify-end">
                  <p className="text-green-300 font-bold flex justify-center items-center text-3xl w-14 h-9 bg-transparent border-2 border-green-300 rounded-md">
                    {selectedMovie.vote_average.toString().length === 1
                      ? `${selectedMovie.vote_average}.0`
                      : selectedMovie.vote_average}
                  </p>
                </div>

                <Link key={selectedMovie.id} to={`/single/${selectedMovie.id}`}>
                  <button className="w-32 h-10 rounded-xl mt-9 group/button outline-light-purple outline outline-1 hover:outline-none hover:bg-orange-500 transition-all ">
                    <p className="text-light-purple font-bold text-xl group-hover/button:text-black ">
                      More Info
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-evenly">
        {categories.map((category, index) => (
          <button
            key={index}
            className="m-5 bg-transparent border-2 border-light-purple border-solid p-2 rounded-2xl text-3xl font-bold "
            onClick={() => {
              dispatch(resetCount());
              filterMovies(category.filter);
            }}
          >
            {categories[index].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 breakpoint-small:grid-cols-2 breakpoint-med:grid-cols-3 breakpoint-large:grid-cols-4 justify-items-center">
        {movieList.map((movieCard, i) => (
          <MovieCard
            key={i}
            movie={movieCard}
            isFav={isFav(favs, null, movieCard.id)}
          />
        ))}
      </div>
      {/* View More Button */}
      <button onClick={showMore} className=" group/button w-48 h-12 rounded-lg outline-light-purple outline outline-1 mt-8 ml-2 hover:outline-none hover:bg-orange-500 transition-all">
              <a className="text-light-purple font-bold text-xl group-hover/button:text-black">
                View More
              </a>
            </button>
    </section>
  );
};

export default PageHome;
