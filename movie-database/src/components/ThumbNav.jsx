import { MdMovieFilter } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { BsHourglassSplit } from "react-icons/bs";
import { IconContext } from "react-icons";
import React from "react";

const ThumbNav = () => {
  return (
    <IconContext.Provider
      value={{ color: "white", size: "3rem", className: "global-class-name" }}
    >
      <nav>
        <ul className="flex text-white text-center uppercase">
          <li>
            <div>
              <MdMovieFilter />
              <p>
                Now <br></br>Playing
              </p>
            </div>
          </li>
          <li>
            <FaThumbsUp />
            <p>
                Top <br></br>Rated
              </p>
          </li>
          <li>
            <FaRegHeart />
            <p>
                Popular<br></br>Movies
              </p>
          </li>
          <li>
            <BsHourglassSplit />
            <p>
                Upcoming <br></br>Movies
              </p>
          </li>
          <li>
            <button>
              <p className="text-white">Hamburger Menu</p>
            </button>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

export default ThumbNav;
