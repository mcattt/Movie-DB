// Page - Home

import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";

const apiKey = "499d34c8aaf241d4909feaf69a3c37c1";
const endPointThemes = `https://api.themoviedb.org/3/movie/now_playing/?key=${apiKey}`;

const PageHome = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    document.title = `${appTitle} - Home`;
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZkZTJkYmVmZjc0MzVkYWIxMzE3NDFlNmFhYTRlZCIsInN1YiI6IjY0ZWUxODhhNGNiZTEyMDEzODlkNWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wP7biHdlHFHu3vEQP1oq3lEjZYVWDt9pWBVv1-YYihU",
        },
      };
      const res = await fetch(endPointThemes, options);
      let data = await res.json();
      console.log({ data });
      const shortList = data.results.slice(0, 12);
      console.log(shortList);
      setMovieList(shortList);
    };

    fetchMovie();
  }, []);

  return (
    <section>
      <h2>Home Page</h2>
      <ul>
        {movieList !== null &&
          movieList !== undefined &&
          movieList.map((movie) => {
            return (
              <div key={movie.id}>
                <img 
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} // w200 is width 200px
                  alt={movie.title}
                />
                <li>{movie.title}</li>
              </div>
            );
          })}
      </ul>
    </section>
  );
};

export default PageHome;
