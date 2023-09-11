// Page - About

import { useEffect } from "react";
import { appTitle } from "../globals/globals";
import { Link } from "react-router-dom";
import aboutImage from "/assets/images/about-image.jpg";
import tmdbLogo from "/assets/images/tmdb-logo.png";

const PageAbout = () => {
  useEffect(() => {
    document.title = `${appTitle} - About`;
  }, []);

  return (
    <section className="">
      <img src={aboutImage} alt="A photo of 3 people watching movies in the theater" className="h-80 w-full object-cover"/>
      <div className="mt-8">
        <h2 className="font-bold text-2xl my-8">About <span className="text-bright-orange">Clip</span>Movies</h2>
        <p>
        The ClipMovies movie database is a website where users can find popular, top rated, now playing and upcoming movie listings. Browse for your favourite genres or movies, check out their ratings and see how they match up!
      </p> <br />
      <p className="mb-8">
        Found something you like? Add them to your favourites and remove any item anytime.
        </p>
        <Link to="/">
          <p className="px-4 text-center font-bold border-2 border-solid border-bright-orange bg-bright-orange text-dark-purple mb-8 mx-auto sm:bg-transparent sm:text-light-purple sm:border-light-purple rounded-md w-fit sm:hover:border-bright-orange sm:hover:bg-bright-orange sm:hover:text-dark-purple">Clip Movies <br/> Now</p>
      </Link>
      <img src={tmdbLogo} alt="TMDB logo" className="w-32 pb-8"/>
      <p className="mb-20 pb-12 ">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
      </div>
    </section>
  );
};

export default PageAbout;
