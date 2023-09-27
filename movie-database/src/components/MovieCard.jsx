// MovieCard.jsx

import FavButton from "../components/FavButton";
import { useDispatch } from "react-redux";
import favClip from "/assets/images/clip-mark.png";
import React, { useState } from "react"; // Import useEffect
import { useMediaQuery } from "@react-hook/media-query";
import { Link } from "react-router-dom";
import { Rate } from "antd";
// https://ant.design/components/rate
import { addFav, deleteFav } from "../features/favs/favsSlice"; // Import addFav and deleteFav

function MovieCard({ movie, isFav }) {
  const { title, poster_path, overview, release_date, vote_average, id } =
    movie; //easier way to access properties of movie without having to reference movie.[property] every time
  const snippetMobile = overview.split(" ").slice(0, 15).join(" ");
  const snippetDesktop = overview.split(" ").slice(0, 25).join(" "); //gets first 25 characters of movie overview
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = useMediaQuery("(max-width: 940px)"); //can change

  const singlePoster = useMediaQuery("(max-width: 625px)");

  const dispatch = useDispatch();

  function handleFavClick(isFav, obj) {
    console.log("handleFavClick called");

    if (isFav === true) {
      // console.log(obj);
      dispatch(addFav(obj));
    } else {
      dispatch(deleteFav(obj));
    }

    // console.log("Movie ID:", movie.id);
  }

  return (
    <div className="relative breakpoint-small:max-w-[300px] mt-5 breakpoint-small:min-h-[566px]">
      {/* wraps the movie poster */}
      <div
        className="relative "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={
            singlePoster //makes poster larger for when there's only one per row
              ? `https://image.tmdb.org/t/p/w400${poster_path}`
              : `https://image.tmdb.org/t/p/w300${poster_path}`
          }
          alt={title}
          className="rounded-lg shadow-[0px_0px_60px_10px_#420B5B]"
        />
        {/* if mouse is on the poster opacity set to 100 */}
        <div
          className={`invisible breakpoint-med:visible absolute top-32 left-0 w-full h-20.125 bg-black bg-opacity-80 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="invisible breakpoint-med:visible text-light-purple text-opacity-100 pl-3 pt-10 pr-2 ">
            {snippetDesktop} ...
          </p>
          <button className=" group/button w-24 h-8 rounded-lg outline-light-purple outline outline-1 mt-8 ml-2 hover:outline-none hover:bg-orange-500 transition-all ">
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
          <Rate defaultValue={vote_average / 2} allowHalf disabled />
        </div>
        <div className="flex  items-center ml-auto">
          <p className="bg-green-300 text-xl w-9 h-7 text-dark-purple rounded-md text-center">
            {vote_average.toString().length === 1
              ? `${vote_average}.0`
              : vote_average.toFixed(1)}
          </p>
        </div>
      </div>
      <h3 className="text-2xl overflow-hidden max-w-[400px] breakpoint-small:max-w-img-size whitespace-normal">
        {title}
      </h3>
      <p className="font-extralight italic text-sm">
        {new Date(release_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {isFav && (
        <img className="absolute w-[30px] top-[-25px] right-2" src={favClip}></img>
      )}
      <div className="flex justify-end relative top-[-40px] mb-[-30px]">
        {isFav ? (
          <div>
            <FavButton
              movie={movie}
              remove={true}
              handleFavClick={handleFavClick}
            />
          </div>
        ) : (
          <FavButton movie={movie} handleFavClick={handleFavClick} />
        )}
      </div>
      {isMobile && (
        <div>
          <p className=" overflow-hidden max-w-[400px] breakpoint-small:max-w-img-size whitespace-normal ">
            {snippetMobile} ...
          </p>

          <div className=" flex items-center justify-center mb-10 mt-5 ">
            <button className=" group/button  w-24 h-8 rounded-xl outline-light-purple outline outline-1 active:outline-none active:bg-orange-500 transition-all ">
              <Link
                to={`/single/${id}`}
                className=" text-light-purple text-base group-active/button:text-dark-purple"
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
