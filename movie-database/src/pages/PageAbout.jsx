// Page - About

import { useEffect } from "react";
import { appTitle } from "../globals/globals";
import { Link } from "react-router-dom";
import aboutImage from "/assets/images/about-image.jpg";
import tmdbLogo from "/assets/images/tmdb-logo.png";
import SocialMedia from "../components/SocialMedia";
import AOS from 'aos';
import 'aos/dist/aos.css';

const PageAbout = () => {
  useEffect(() => {
    document.title = `${appTitle} - About`;
  }, []);

  return (
    <section data-aos="fade-in" className="tablet-b:grid tablet-b:grid-cols-2 tablet-b:mt-10">
      <img
        src={aboutImage}
        alt="A photo of 3 people watching movies in the theater"
        className="h-80 w-full object-cover tablet-b:h-auto tablet-b:w-9/12 tablet-b:justify-self-center tablet-b:rounded-[10px] lg:w-8/12 2xl:w-7/12 desktop-1650:w-6/12 xl:row-[1_/_3]"
      />
      <section className="mt-8 px-4 tablet-b:self-start tablet-b:mt-0 tablet-b:pl-0 tablet-b:pr-12 xl:ml-[-4rem]">
        <h2 className="font-bold text-2xl my-8 xl:mt-0">
          About <span className="text-bright-orange">Clip</span>Movies
        </h2>
        <p>
          The ClipMovies movie database is a website where users can find
          popular, top rated, now playing and upcoming movie listings. Browse
          for your favourite genres or movies, check out their ratings and see
          how they match up!
        </p>{" "}
        <br />
        <p className="mb-8">
          Found something you like? Add them to your favourites and remove any
          item anytime.
        </p>
        <Link to="/" className="w-fit block">
          <p className="px-4 text-center font-bold border-2 border-solid border-bright-orange bg-bright-orange text-dark-purple mb-8 mx-auto sm:bg-transparent sm:text-light-purple sm:border-light-purple rounded-md w-fit sm:hover:border-bright-orange sm:hover:bg-bright-orange sm:hover:text-dark-purple tablet-b:mx-0 transition duration-500">
            Clip Movies <br /> Now
          </p>
        </Link>
        <img src={tmdbLogo} alt="TMDB logo" className="w-32 pb-8" />
        <p className="sm:pb-0 sm:mb-0 ">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
      </section>
        <section className="px-4 about-team mb-20 sm:mb-4 tablet-b:col-[1_/_3] tablet-b:px-14 lg:pl-20 xl:col-[2_/_3] xl:pl-0 xl:ml-[-4rem]">
            <h2 className="font-bold text-2xl my-8">About <span className="text-bright-orange">Development Team</span></h2>
            <p>This website has been crafted with dedication and passion by a team of three skilled developers. Feel free to get in touch with us for any inquiries, feedback, or exciting collaboration opportunities! Your input is important to us.</p>
            <ul className="list-disc pl-4 pt-2 font-bold">
              <li className="my-2">Cat Cordner 
                  <SocialMedia linkedInLink={"https://www.linkedin.com/in/catcordner/"}/>
              </li>
              <li className="my-2">Jack Do
                 <SocialMedia linkedInLink={"https://www.linkedin.com/in/jackdo/"}/>
              </li>
              <li className="my-2">Preston Monteiro
                 <SocialMedia linkedInLink={"#"}/>
              </li>
            </ul>
        </section>
    </section>
  );
};

export default PageAbout;
