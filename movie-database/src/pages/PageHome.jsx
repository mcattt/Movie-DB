import MovieCard from "../components/MovieCard";
import ScrollButton from "../components/ScrollToTop";
import { useState, useEffect } from "react";
import { appTitle } from "../globals/globals";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../features/search/searchSlice";
import isFav from "../utilities/isFav";
import { increment } from "../features/more/viewMoreSlice";
import { resetCount } from "../features/more/viewMoreSlice";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import { setshowLoading } from "../features/showLoading/showLoadingSlice";
import Hero from "../components/Hero";
import sadFace from "/assets/images/unhappy-face.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { APIToken } from "../utilities/apiToken";
const endPointThemes = `https://api.themoviedb.org/3/movie/`;
const categories = [
  { filter: "popular", name: "Popular" },
  { filter: "now_playing", name: "Now Playing" },
  { filter: "top_rated", name: "Top Rated" },
  { filter: "upcoming", name: "Upcoming" },
];

const PageHome = () => {
  const [movieList, setMovieList] = useState([]);
  // Initialize with the default filter
  const [currentFilter, setCurrentFilter] = useState("popular");
  // Create a state variable for allMovies
  const [allMovies, setAllMovies] = useState([]);
  const favs = useSelector((state) => state.favs.items);
  // Get the count from Redux state
  const count = useSelector((state) => state.viewMore.count);
  const [isLoaded, setLoadStatus] = useState(false);

  const fetchMovie = async (filter) => {
    let apiUrl;
    // if search input field is used then set the apiUrl to the search query the user is typing
    if (searchQuery) {
      // If there's a search query, use the search endpoint
      apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`;
    } else {
      // Otherwise, use the filter-based endpoint
      apiUrl = `${endPointThemes}${filter}`;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          APIToken
      },
    };

    let res = await fetch(apiUrl, options);
    if (res.ok) {
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
      setMovieList(shortList);
      setLoadStatus(true);
    } else {
      setLoadStatus(false);
    }
  };

  useEffect(() => {
    document.title = `${appTitle} - Home`;
    fetchMovie("popular");
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Add a new state variable for currentPage
  const [currentPage, setCurrentPage] = useState(1);

  // Handles View More
  useEffect(() => {
    // Listen for changes in the Redux count
    setMovieList(allMovies.slice(0, count));
    AOS.refresh();
  }, [count, allMovies]);

  const showMore = async (filter) => {
    // variable to dynamically update current page
    const nextPage = currentPage + 1;
    // variable to dynamically update apiUrl based on what the next page movies should be
    const apiUrl = `${endPointThemes}${filter}?page=${nextPage}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          APIToken
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
      AOS.refresh();
    } else {
      return;
    }
  };

  // Variable to get value that user types in search input field -> state = the whole redux store, .search selectes the search slice
  const searchQuery = useSelector((state) => state.search);

  // Filter movies by search, passing in searchQuery as a parameter (SEARCHQUERY IS THE INPUT VALUE THAT THE USER IS TYPING, SEE SEARCHQUERY VARIABLE IF CONFUSED)
  const filterMoviesBySearch = (searchQuery) => {
    if (searchQuery === "") {
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
    // Reset searchQuery to an empty string
    dispatch(setSearchQuery(""));
    // Fetch movies based on the selected filter
    fetchMovie(filter);
    // Reset count to 12 to show first 12 movies
    dispatch(resetCount());
    // Reset currentPage to 1
    setCurrentPage(1);
    // Sets Current Filter to the category filter button when selected for use with showMore function
    setCurrentFilter(filter);
  };

  // Delay Loading GIF - Redux slice
  const showLoading = useSelector((state) => state.showLoading);

  // Use useEffect to control when to hide the loading animation
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      dispatch(setshowLoading(false));
    }, 2000); // Adjust the delay time in milliseconds as needed

    return () => {
      // Clear the timeout if the component unmounts before the delay completes
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      {showLoading ? (
        <Loading />
      ) : (
        <>
          {isLoaded ? (
            <section data-aos="fade-in">
              <Hero data-aos="zoom-in" movieList={movieList} />
              <div className="flex justify-evenly my-8 breakpoint-med:my-12">
                <SearchBar />
              </div>
              {/* Filter Buttons */}
              <div className="mb-2 mt-4 flex flex-wrap justify-evenly min-[409px]:gap-2 min-[425px]:text-[1.2rem] min-[484px]:gap-4 min-[500px]:gap-8 min-[532px]:gap-[0.7rem] min-[847px]:flex-nowrap min-[847px]:mb-4 min-[985px]:text-2xl min-[1271px]:text-[1.75rem]">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`m-2 p-2 w-[125px] min-[425px]:w-[145px] min-[532px]:mx-[2rem] min-[628px]:w-1/4 min-[1271px]:w-[246.5px] rounded-2xl font-bold sm:hover:text-dark-purple  sm:hover:border-bright-orange 
            ${currentFilter === category.filter
                        ? "bg-bright-orange border-bright-orange border-solid border-2 text-dark-purple"
                        : "border-light-purple border-solid border-2 transition duration-500 sm:bg-transparent sm:hover:bg-bright-orange"
                      }
            `}
                    onClick={() => {
                      filterMovies(category.filter);
                    }}
                  >
                    {categories[index].name}
                  </button>
                ))}
              </div>

              {/* Condition for no results found */}
              {allMovies.length === 0 && (
                <div className="flex flex-col items-center">
                  <img
                    src={sadFace}
                    alt=""
                    className="w-[7rem] mt-24 breakpoint-small:w-[8rem] breakpoint-med:w-[14rem]"
                  />
                  <p className=" font-bold breakpoint-small:text-2xl breakpoint-med:text-3xl mt-16 mb-16">
                    No results found for "{searchQuery}". Please try again!
                  </p>
                </div>
              )}
              <div data-aos="fade-up" className="mx-4 grid grid-cols-1 breakpoint-small:grid-cols-2 breakpoint-med:grid-cols-3 breakpoint-large:grid-cols-4 justify-items-center">
                {movieList.map((movieCard, i) => (
                  <MovieCard
                    key={i}
                    movie={movieCard}
                    isFav={isFav(favs, null, movieCard.id)}
                  />
                ))}
              </div>
              {/* View More Button with conditional on no search results which will set button display to hidden */}
              <div
                className={`flex justify-center mb-20 tablet-b:mb-0 ${allMovies.length === 0 ? "hidden" : ""
                  }`}
              >
                <button
                  onClick={() => showMore(currentFilter)}
                  className="group/button w-44 h-12 rounded-2xl bg-bright-orange outline-bright-orange tablet-b:bg-transparent tablet-b:outline-light-purple outline outline-1 mt-8 ml-2 tablet-b:hover:outline-bright-orange tablet-b:hover:bg-orange-500 transition-all duration-500"
                >
                  <a className="text-dark-purple tablet-b:text-light-purple font-bold text-xl tablet-b:group-hover/button:text-dark-purple ">
                    View More
                  </a>
                </button>
              </div>

              <ScrollButton />
            </section>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
};

export default PageHome;
