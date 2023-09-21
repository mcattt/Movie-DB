// favourites
import { useEffect } from "react";
import { appTitle } from "../globals/globals";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import sadFace from "/assets/images/unhappy-face.png";
const PageFavourites = () => {
  const favs = useSelector((state) => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} - Favourites`;
  }, []);
  return (
    <section>
      {favs.length < 1 ? (
        <div className="flex  flex-col items-center  justify-center mt-5 breakpoint-med:mt-36 ">
          <img src={sadFace} alt="" className=" " />
          <p className=" text-center pt-10 text-3xl px-3">
            Sorry, you have no favourite movies. Return to the home page to add
            your favourite movies.
          </p>
          <Link to={`/`}>
            <button className="w-60 rounded-xl mb-[88px] mt-24 breakpoint-med:mt-32 group/button outline-light-purple outline outline-1  active:outline-none breakpoint-med:hover:outline-none active:bg-orange-500 breakpoint-med:hover:bg-orange-500 transition-all ">
              <p className="m-1 text-light-purple font-bold text-3xl group-active/button:text-dark-purple breakpoint-med:group-hover/button:text-dark-purple">
                Clip Movies Now
              </p>
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-5xl font-bold mt-16 ml-16 mb-5">
            Your Favourites
          </h2>
          <div className="grid grid-cols-1 breakpoint-small:grid-cols-2 breakpoint-med:grid-cols-3 breakpoint-large:grid-cols-4 justify-items-center ">
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
