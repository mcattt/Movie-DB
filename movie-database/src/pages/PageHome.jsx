// Page - Home

import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";

const apiKey = "499d34c8aaf241d4909feaf69a3c37c1";
const endPointThemes = `https://api.themoviedb.org/3/movie/`;
const categories = [
  { filter: 'now_playing', name: 'Now Playing' },
  { filter: 'upcoming', name: 'Upcoming' },
  { filter: 'top_rated', name: 'Top Rated' },
  { filter: 'popular', name: 'Popular' }
];
// const [filter, setFilter] = useState['now_playing'];





const PageHome = () => {
  const [movieList, setMovieList] = useState([]);
  // Next 3 variables are for getting the hero movie
  const [selectedBackdrop, setSelectedBackdrop] = useState(""); // State variable to hold the selected backdrop path
  const [selectedMovie, setSelectedMovie] = useState(""); // State variable to hold the selected Movie path
  const [initialized, setInitialized] = useState(false); // Initialize as false


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


    const res = await fetch(`${endPointThemes}${filter}?api_key=${apiKey}`, options);
    let data = await res.json();

    const shortList = data.results.slice(0, 12);

    console.log({ data });

    console.log(shortList);
    setMovieList(shortList);
  };




  useEffect(() => {
    document.title = `${appTitle} - Home`;
    fetchMovie('now_playing');
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



  return (
    <section>
      <div className="hero-image">
        {selectedBackdrop && ( // Check if a backdrop is selected
          <div className="relative">
            <img className="opacity-20"
              src={`https://image.tmdb.org/t/p/original${selectedBackdrop}`}
              alt="Backdrop"
            />
            <div className="info-container absolute bottom-8 left-48 max-w-xl">
              <h4 className="text-light-purple text-1xl mb-2">
                {new Date(selectedMovie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <h3 className="text-light-purple font-bold text-4xl">{selectedMovie.title}</h3>
              <p className="text-light-purpletext-2xl mt-6">{selectedMovie.overview}</p>
            </div>
            <div className="info-container absolute bottom-32 right-64 flex flex-col">
              <div className="flex justify-end">
                <p className="text-green-300 font-bold flex justify-center items-center text-3xl w-14 h-9 bg-transparent border-2 border-green-300 rounded-md">
                  {(selectedMovie.vote_average.toString()).length === 1
                    ? `${selectedMovie.vote_average}.0`
                    : selectedMovie.vote_average}
                </p>
              </div>
              <button className="w-32 h-10 rounded-md bg-orange-500 mt-8"><a className="text-black font-bold text-xl" href="">More Info</a></button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-evenly">
        {categories.map((category, index) => (
          <button key={index} className="m-5 bg-transparent border-2 border-light-purple border-solid p-2 rounded-2xl text-3xl font-bold "
            onClick={() => {
              filterMovies(category.filter);
            }
            }
          >{categories[index].name

            }</button>
        )
        )}
      </div>



      {/* Movie list */}
      <div className="grid grid-cols-4 justify-items-center">
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default PageHome;

const MovieCard = ({ movie }) => {
  const { title, poster_path, overview, release_date, vote_average } = movie; //easier way to access properties of movie without having to reference movie.[property] every time
  const snippet = overview.split(' ').slice(0, 25).join(' '); //gets first 25 characters of movie overview
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-[300px] mt-5">
      {/* wraps the movie poster */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
        />
        {/* if mouse is on the poster opacity set to 100 */}
         <div className={`absolute top-32 left-0 w-full h-20.125 bg-black bg-opacity-80 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-light-purple text-opacity-100 pl-3 pt-10 pr-2 ">
              {snippet} ...
            </p>
            <button className=" group/button w-24 h-8 rounded-xl outline-light-purple outline outline-1 mt-8 ml-2 hover:outline-none hover:bg-orange-500 transition-all ">
              <a className="text-light-purple font-bold text-base group-hover/button:text-black" href="">
                More Info
              </a>
            </button>
          </div>
  
      </div>
      <div className="movie-rating flex justify-between mt-1">
        <p>
          INSERT STARS HERE
        </p>
        <p className="text-green-300 font-bold flex justify-center items-center text-3xl w-14 h-9 bg-transparent border-2 border-green-300 rounded-md">
          {vote_average.toString().length === 1 ? `${vote_average}.0` : vote_average}
        </p>
      </div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="font-extralight italic text-sm">
        {new Date(release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};