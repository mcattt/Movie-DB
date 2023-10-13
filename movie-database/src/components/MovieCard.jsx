// MovieCard.jsx
import StarRating from "./StarRating";
import FavButton from "../components/FavButton";
import { useDispatch } from "react-redux";
import favClip from "/assets/images/clip-mark.png";
import noPoster from "/assets/images/no-poster-ver3.png";
import React, { useState } from "react"; // Import useEffect
import { useMediaQuery } from "@react-hook/media-query";
import { Link } from "react-router-dom";
import { addFav, deleteFav } from "../features/favs/favsSlice"; // Import addFav and deleteFav

function MovieCard({ movie, isFav }) {
  const { title, poster_path, overview, release_date, vote_average, id } =
    movie; //easier way to access properties of movie without having to reference movie.[property] every time
  const snippetMobile = overview.split(" ").slice(0, 15).join(" ");
  const snippetDesktop = overview.split(" ").slice(0, 25).join(" "); //gets first 25 characters of movie overview
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = useMediaQuery("(max-width: 899px)"); 

  const dispatch = useDispatch();

  function handleFavClick(isFav, obj) {
    if (isFav === true) {
      dispatch(addFav(obj));
    } else {
      dispatch(deleteFav(obj));
    }
  }

  return (
    <div
      data-aos="fade-up"
      className=" relative  mt-5 breakpoint-small:min-h-[566px] breakpoint-small:max-w-[300px] breakpoint-xl:max-w-[400px] breakpoint-xl:mb-10 sm:scale-100 sm:hover:scale-[1.01] transition-all duration-500"
    >
      {/* wraps the movie poster */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w400${poster_path}`}
            alt={title}
            className="rounded-lg shadow-[0px_0px_60px_10px_#420B5B]"
          />
        ) : (
          <img
            src={noPoster}
            alt={title}
            className="rounded-lg shadow-[0px_0px_60px_10px_#420B5B]"
          />
        )}
        {/* if mouse is on the poster opacity set to 100 */}
        <div
          className={`invisible tablet-b:visible absolute top-32 left-0 w-full h-20.125 breakpoint-xl:top-48 breakpoint-xl:h-[408px] bg-black bg-opacity-80 rounded-b-lg transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="invisible tablet-b:visible text-light-purple text-opacity-100 pl-3 pt-10 pr-2 breakpoint-xl:text-lg">
            {snippetDesktop}...
          </p>
          <button className=" group/button w-24 h-8 rounded-lg bg-transparent outline-light-purple outline outline-1 mt-8 ml-2 hover:outline-orange-500 hover:bg-orange-500 transition-all duration-500 ">
            <Link
              to={`/single/${id}`}
              className="text-light-purple font-bold text-base group-hover/button:text-dark-purple"
            >
              More Info
            </Link>
          </button>
        </div>
      </div>

      <div className="movie-rating flex justify-between mt-2">
        <div className="flex items-center">
          <StarRating vote_average={vote_average} />
        </div>
        <div className="flex  items-center ml-auto">
          <p className="bg-green-300 text-xl font-bold w-9 h-7 text-dark-purple rounded-md text-center z-20">
            {vote_average.toString().length === 1
              ? `${vote_average}.0`
              : vote_average.toFixed(1)}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="text-2xl overflow-hidden max-w-[400px] breakpoint-small:max-w-[250px] whitespace-normal ">
          {title}
        </h3>
        <div className="mt-2 cursor-pointer ">
          {isFav ? (
            <div>
              <FavButton
                movie={movie}
                remove={true}
                handleFavClick={handleFavClick}
              />
            </div>
          ) : (
            <div>
              <FavButton 
              movie={movie} 
              handleFavClick={handleFavClick} />
            </div>
          )}
        </div>
      </div>
      <p className="font-extralight italic text-sm">
        {new Date(release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {isFav && (
        <img data-aos="fade-in"
          className="absolute w-[30px] top-[-25px] right-2"
          src={favClip}
        ></img>
      )}

      {isMobile && (
        <div>
          <p className=" overflow-hidden max-w-[400px] breakpoint-small:max-w-img-size whitespace-normal ">
            {snippetMobile} ...
          </p>

          <div className=" flex items-center justify-center mb-10 mt-5 ">
            <button className=" group/button  w-24 h-8 rounded-xl outline-none bg-orange-500 ">
              <Link
                to={`/single/${id}`}
                className=" text-dark-purple  font-bold"
              >
                More Info
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default MovieCard;
