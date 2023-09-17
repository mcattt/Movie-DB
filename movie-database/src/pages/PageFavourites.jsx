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

  return (
    <section>
      <h2>About Favourites</h2>
      <div>
        {favs.map((singleMovie, i) => (
          <MovieCard key={i} movie={singleMovie} isFav={true} />
        ))}
      </div>
    </section>
  );
};

export default PageFavourites;
