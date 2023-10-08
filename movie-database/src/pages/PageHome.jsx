import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";
import { useSelector, useDispatch } from "react-redux";
import isFav from "../utilities/isFav";
import { increment } from '../features/more/viewMoreSlice';
import { resetCount } from '../features/more/viewMoreSlice';
import SearchBar from '../components/SearchBar'; // Import the SearchBar component
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
  const [currentFilter, setCurrentFilter] = useState("popular"); // Initialize with the default filter
   // Create a state variable for allMovies
   const [allMovies, setAllMovies] = useState([]);

  const favs = useSelector((state) => state.favs.items);
  const count = useSelector((state) => state.viewMore.count); // Get the count from Redux state

  const fetchMovie = async (filter) => {
    let apiUrl;
  
    // if search input field is used then set the apiUrl to the search query the user is typing
    if (searchQuery) {
      // If there's a search query, use the search endpoint
      apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`;
    } else {
      // Otherwise, use the filter-based endpoint
      apiUrl = `${endPointThemes}${filter}?api_key=${apiKey}`;
    }
  
    console.log("Fetching data from URL:", apiUrl); // Log the URL
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDZkZTJkYmVmZjc0MzVkYWIxMzE3NDFlNmFhYTRlZCIsInN1YiI6IjY0ZWUxODhhNGNiZTEyMDEzODlkNWM2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wP7biHdlHFHu3vEQP1oq3lEjZYVWDt9pWBVv1-YYihU",
      },
    };
  
    let res = await fetch(apiUrl, options);
    let data = await res.json();
  
    // Handle search results and regular category-based results separately
    if (searchQuery) {
      // If it's a search query, update allMovies with search results
      setAllMovies(data.results);
    } else {
      // If it's a category-based query, update allMovies with category results
      setAllMovies(data.results);
    }
  
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

  
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  
  // Add a new state variable for currentPage
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    // Listen for changes in the Redux count
    setMovieList(allMovies.slice(0, count));
  }, [count, allMovies]);
  
  const showMore = async (filter) => {
    // variable to dynamically update current page
    const nextPage = currentPage + 1;
    // variable to dynamically update apiUrl based on what the next page movies should be
    const apiUrl = `${endPointThemes}${filter}?api_key=${apiKey}&page=${nextPage}`;

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
    
    if (data.results && data.results.length > 0) {
      // Concatenate additionalMovies with allMovies
      const additionalMovies = data.results;
      // adding the next full page of movies into the array with the previous full page of movies
      setAllMovies((prevAllMovies) => [...prevAllMovies, ...additionalMovies]);
      // Incrementing the count on click of view more to show additional 12 movies
      dispatch(increment());
      
      setCurrentPage(nextPage);
    } else {
      return;
    }
  };


  // Variable to get value that user types in search input field -> state = the whole redux store, .search selectes the search slice 
  const searchQuery = useSelector((state) => state.search);
  
  // Filter movies by search, passing in searchQuery as a parameter (SEARCHQUERY IS THE INPUT VALUE THAT THE USER IS TYPING, SEE SEARCHQUERY VARIABLE IF CONFUSED)
  const filterMoviesBySearch = (searchQuery) => {
    if (searchQuery === '') {
      // If the search query is empty, show movies based on the current filter
      fetchMovie(currentFilter);
    } else {
      // If there's a search query, fetch search results
      fetchMovie(searchQuery);
    }
  };
  
  // Calling the filtering function for movies everytime searchQuery changes
  useEffect(() => {
    filterMoviesBySearch(searchQuery);
  }, [searchQuery]);

  // Function to filter movies on click of category button and reset intial load of movies to first 12 on page 1
  const filterMovies = (filter) => {
    fetchMovie(filter);
    // Reset count to 12 to show first 12 movies
    dispatch(resetCount());
    // Reset currentPage to 1
    setCurrentPage(1);
     // Sets Current Filter to the category filter button when selected for use with showMore function
    setCurrentFilter(filter); 
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
                    <p className="text-light-purple font-bold text-xl group-hover/button:text-dark-purple ">
                      More Info
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-evenly mt-8 mb-4">
        <SearchBar></SearchBar>
      </div>
      <div className="mb-2 mt-4 flex flex-wrap justify-evenly min-[409px]:gap-2 min-[425px]:text-[1.2rem] min-[484px]:gap-4 min-[500px]:gap-8 min-[532px]:gap-2 min-[847px]:flex-nowrap min-[847px]:mb-4 min-[985px]:text-2xl min-[1271px]:text-[1.75rem]">
        {categories.map((category, index) => (
          <button
            key={index}
            className={
            `m-2 p-2 w-[115.31px] min-[425px]:w-[135px] min-[532px]:mx-[2rem] min-[628px]:w-1/4 min-[1271px]:w-[246.5px] rounded-2xl font-bold hover:text-dark-purple hover:bg-bright-orange hover:border-bright-orange
              ${currentFilter === category.filter ? 'bg-bright-orange border-bright-orange border-solid border-2 text-dark-purple' : 'border-light-purple border-solid border-2'}
            `}
            onClick={() => {
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
      <div className="flex justify-center">
        <button
          onClick={() => showMore(currentFilter)}
          className="group/button w-44 h-12 rounded-lg outline-light-purple outline outline-1 mt-8 ml-2 hover:outline-none hover:bg-orange-500 transition-all"
        >
          <a className="text-light-purple font-bold text-xl group-hover/button:text-dark-purple">View More</a>
        </button>
    </div>
    </section>
  );
};

export default PageHome;
