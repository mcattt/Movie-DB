// Page - Single Movie
import { Rate } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";
const apiKey = "499d34c8aaf241d4909feaf69a3c37c1";
const endPointThemes = `https://api.themoviedb.org/3/movie/`;

const PageSingle = () => {
  let { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [credits, setCredits] = useState([]);
  const fetchMovie = async () => {
    const apiUrl = `${endPointThemes}${id}?api_key=${apiKey}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZkZTJkYmVmZjc0MzVkYWIxMzE3NDFlNmFhYTRlZCIsInN1YiI6IjY0ZWUxODhhNGNiZTEyMDEzODlkNWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wP7biHdlHFHu3vEQP1oq3lEjZYVWDt9pWBVv1-YYihU",
      },
    };

    console.log("Fetching data from URL:", apiUrl); // Log the URL
    try {
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }

      const data = await response.json();
      console.log(data);
      setSelectedMovie(data);
      // Now, you have the data of the specific movie in the 'data' variable
      // You can do whatever you want with this data
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const fetchCredits = async () => {
    const apiUrl = `${endPointThemes}${id}/credits?api_key=${apiKey}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZkZTJkYmVmZjc0MzVkYWIxMzE3NDFlNmFhYTRlZCIsInN1YiI6IjY0ZWUxODhhNGNiZTEyMDEzODlkNWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wP7biHdlHFHu3vEQP1oq3lEjZYVWDt9pWBVv1-YYihU",
      },
    };

    console.log("Fetching data from URL:", apiUrl); // Log the URL
    try {
      const response = await fetch(apiUrl, options);
      if (!response.ok) {
        throw new Error("Failed to fetch credits");
      }

      const data = await response.json();
      const shortList = data.cast.slice(0, 5); // Check if data.results is defined
      console.log(shortList);
      setCredits(shortList);
      // Now, you have the data of the specific movie in the 'data' variable
      // You can do whatever you want with this data
    } catch (error) {
      console.error("Error fetching credits", error);
    }
  };

  useEffect(() => {
    document.title = `${appTitle} - Single ${id}`;
    fetchMovie();
    fetchCredits();
  }, [id]);

  const CastCard = ({ cast }) => {
    const { character, name, profile_path } = cast;
    return (
      <div>
        <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt="" />
        <p>{name}</p>
        <p>{character}</p>
      </div>
    );
  };

  return (
    <section>
      <Rate
        value={
          typeof selectedMovie.vote_average === "number"
            ? selectedMovie.vote_average / 2
            : 0
        }
        allowHalf
        disabled
      />{" "}
      <p>{selectedMovie.vote_average}</p>
      <img
        src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
        alt={selectedMovie.title}
      />
      <p>{selectedMovie.title}</p>
      <p>
        {selectedMovie.release_date} - {selectedMovie.runtime}
      </p>
      {/* this checks if genres is set */}
      {selectedMovie.genres && (
        <p>
          {selectedMovie.genres.map((genre, index) => (
            <span key={"genre_${genre.id}"}>
              {/* this adds a comma before every genre, doesnt add when index is 0 */}
              {index ? ", " : ""}
              {genre.name}
            </span>
          ))}
        </p>
      )}
      <p>{selectedMovie.tagline}</p>
      <h3>Overview</h3>
      <p> {selectedMovie.overview}</p>
      <h3>Cast</h3>
      {credits.map((cast) => (
        <CastCard key={cast.credit_id} cast={cast} />
      ))}
    </section>
  );
};

export default PageSingle;
