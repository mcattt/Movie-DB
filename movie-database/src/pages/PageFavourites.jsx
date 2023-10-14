import { useEffect } from "react";
import { appTitle } from "../globals/globals";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import sadFace from "/assets/images/unhappy-face.png";
import AOS from "aos";
import "aos/dist/aos.css";
const PageFavourites = () => {
  const favs = useSelector((state) => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} - Favourites`;
    AOS.init();
  }, []);
  return (
    <section data-aos="fade-in" className="mb-16 sm:mb-0">
      {favs.length < 1 ? (
        <div className="flex  flex-col items-center  justify-center mt-10 ">
          <img
            data-aos="fade-in"
            src={sadFace}
            alt="sad face icon"
            className=" w-[14rem] breakpoint-small:mt-24"
          />
          <p
            data-aos="fade-in"
            className=" text-center pt-10 text-2xl breakpoint-small:text-3xl px-3"
          >
            Sorry, you have no favourite movies. Return to the home page to add
            your favourite movies.
          </p>
          <Link to={`/`}>
            <button
              data-aos="fade-in"
              className="border-2 border-solid rounded-md w-48 mt-10 mb-[88px] bg-bright-orange border-bright-orange group/button tablet-b:bg-transparent tablet-b:border-light-purple  tablet-b:active:border-orange-500 tablet-b:hover:border-orange-500 active:bg-orange-500 tablet-b:hover:bg-orange-500 transition duration-500 "
            >
              <p
                data-aos="fade-in"
                className="px-4 text-center leading-tight text-dark-purple tablet-b:text-light-purple font-bold text-2xl  tablet-b:group-active/button:text-dark-purple tablet-b:group-hover/button:text-dark-purple"
              >
                Clip Movies Now
              </p>
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-5xl font-bold mt-16 ml-12 mb-5">
            Your Favourites
          </h2>
          <div className="grid grid-cols-1 breakpoint-small:grid-cols-2 breakpoint-med:grid-cols-3 breakpoint-large:grid-cols-4 justify-items-center mb-[50px] tablet-b:mb-0 ">
            {favs.map((singleMovie, i) => (
              <MovieCard key={i} movie={singleMovie} isFav={true} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default PageFavourites;
