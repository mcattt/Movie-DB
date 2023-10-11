import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = ({movieList}) => {
    const [selectedBackdrop, setSelectedBackdrop] = useState(""); // State variable to hold the selected backdrop path
    const [selectedMovie, setSelectedMovie] = useState(""); // State variable to hold the selected Movie path
    const [initialized, setInitialized] = useState(false); // Initialize as false
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
      }, [movieList]);

    return (
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
            <div className="info-container flex flex-col items-center breakpoint-med:flex-row breakpoint-med:justify-around absolute bottom-[30px] breakpoint-xsmall:bottom-[60px] w-full">
              <div className="max-w-xl">
                <h4 className="text-center breakpoint-med:text-start text-light-purple text-1xl mb-2 italic">
                  {new Date(selectedMovie.release_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </h4>
                <h3 className="text-2xl text-center breakpoint-med:text-start text-light-purple font-bold breakpoint-xsmall:text-4xl">
                  {selectedMovie.title}
                </h3>
                <p className="hidden breakpoint-med:block text-light-purple mt-6 breakpoint-xl:text-xl">
                  {selectedMovie.overview}
                </p>
              </div>
              <div className="breakpoint-med:justify-end">
                <div className="hidden breakpoint-med:flex justify-end">
                  <p className="text-green-300 font-bold flex justify-center items-center text-3xl w-14 h-9 bg-transparent border-2 border-green-300 rounded-md">
                    {selectedMovie.vote_average.toString().length === 1
                      ? `${selectedMovie.vote_average}.0`
                      : selectedMovie.vote_average.toFixed(1)}
                  </p>
                </div>

                <Link key={selectedMovie.id} to={`/single/${selectedMovie.id}`} className="transition duration-500">
                  <button className="bg-bright-orange w-[6.5rem] h-8 breakpoint-xsmall:w-32 breakpoint-xsmall:h-10 rounded-xl mt-5 breakpoint-med:mt-9 group/button sm:outline-light-purple sm:outline sm:outline-1 sm:hover:outline-bright-orange sm:bg-transparent sm:hover:bg-bright-orange">
                    <p className="font-bold text-base text-dark-purple breakpoint-xsmall:text-xl sm:text-light-purple  sm:group-hover/button:text-dark-purple sm:transition sm:duration-500 ">
                      More Info
                    </p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}


export default Hero