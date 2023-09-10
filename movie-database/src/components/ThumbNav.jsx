import { FaInfoCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import React from "react";

const ThumbNav = () => {
  return (
    <IconContext.Provider
      value={{ color: "#CA98E5", size: "2rem", className: "global-class-name" }}
    >
      <nav className="sm:hidden">
        <ul className="text-light-purple text-center uppercase grid grid-cols-3">
          <li>
            <NavLink to="/">
              <div className="flex flex-col items-center ">
                <IoHome /> 
                <span className="pt-1 text-sm font-bold">Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              <div className="flex flex-col items-center ">
                <FaInfoCircle /> 
                <span className="pt-1 text-sm font-bold">About</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/favourites">
              <div className="flex flex-col items-center ">
                <FaRegHeart /> 
                <span  className="pt-1 text-sm font-bold">Favourites</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

export default ThumbNav;
