// Page - Home

import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";

const apiKey = "499d34c8aaf241d4909feaf69a3c37c1";
const endPointThemes = `https://api.themoviedb.org/3/movie/`;
const categories = [
{filter: 'now_playing', name: 'Now Playing'}, 
{filter: 'upcoming', name: 'Upcoming'}, 
{filter: 'top_rated', name: 'Top Rated' }, 
{filter: 'popular', name: 'Popular'}
];
// const [filter, setFilter] = useState['now_playing'];





const PageHome = () => {
  const [movieList, setMovieList] = useState([]);
  // Next 2 variables are for getting the hero movie
  const [selectedBackdrop, setSelectedBackdrop] = useState(""); // State variable to hold the selected backdrop path
  const [selectedMovie, setSelectedMovie] = useState(""); // State variable to hold the selected Movie path


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
    // Check if movieList is not empty and select a random movie
    if (movieList.length > 0) {
      const randomIndex = Math.floor(Math.random() * movieList.length);
      const randomMovie = movieList[randomIndex];
      setSelectedMovie(randomMovie); // Set the selectedMovie state
      setSelectedBackdrop(randomMovie.backdrop_path); // Set the selectedBackdrop state using selectedMovie
    }
  }, [movieList]);

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
          </div>
        )}
      </div>

      <div className="flex justify-evenly">
        {categories.map((category, index) => (
          <button key={index} className="m-5 bg-transparent border-2 border-light-purple border-solid p-2 rounded-2xl text-3xl font-bold"
            onClick={() => {
              filterMovies(category.filter);
            }
            }
          >{categories[index].name

            }</button>
        )
        )}
      </div>

      


      <div className="grid grid-cols-4 justify-items-center">
        {movieList !== null &&
          movieList !== undefined &&
          movieList.map((movie) => {
            return (
              <div key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} // w200 is width 200px
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default PageHome;
