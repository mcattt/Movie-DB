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
      <h2>Your Favourites</h2>
      {favs.length < 1 ? (
        <div className="flex  flex-col items-center  justify-center mt-[5%]">
          <img src={sadFace} alt="" className=" " />
          <p className=" text-center pt-10 text-3xl">
            Sorry, you have no favourite movies. Return to the home page to add
            your favourite movies.
          </p>
          <Link to={`/`}>
            <button className="w-60 rounded-xl mt-32 group/button outline-light-purple outline outline-1 hover:outline-none hover:bg-orange-500 transition-all ">
              <p className="m-1 text-light-purple font-bold text-3xl group-hover/button:text-dark-purple">
                Clip Movies Now
              </p>
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 breakpoint-small:grid-cols-2 breakpoint-med:grid-cols-3 breakpoint-large:grid-cols-4 justify-items-center">
          {favs.map((singleMovie, i) => (
            <MovieCard key={i} movie={singleMovie} isFav={true} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PageFavourites;
