// favourites
import { useEffect } from "react";
import { appTitle } from "../globals/globals";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
const PageFavourites = () => {
  const favs = useSelector((state) => state.favs.items);

  useEffect(() => {
    document.title = `${appTitle} - Favourites`;
  }, []);
  console.log(favs);
  return (
    <section>
      <h2>About Favourites</h2>
      {favs.length < 1 ? (
        <h2>EMPTY</h2>
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
