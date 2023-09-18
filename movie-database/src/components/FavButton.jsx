import { IoAddCircle } from "react-icons/io5";
import { IoRemoveCircle } from "react-icons/io5";
import { useState } from "react";
function FavButton({ movie, remove, handleFavClick }) {
  const [clicked, setClicked] = useState(false);

  function handleAddFav() {
    console.log("Adding to favorites");
    setClicked(true);
    handleFavClick(true, movie);
  }

  function handleRemoveFav() {
    console.log("Removing from favorites");
    setClicked(false);
    handleFavClick(false, movie);
  }

  return (
    <>
      {remove === false ? (
        <div onClick={handleAddFav}>
          {clicked ? <p>remove from faves</p> : <p>add to faves </p>}
        </div>
      ) : (
        <div onClick={handleRemoveFav}>
          {clicked ? <p>remove from faves</p> : <p>add to faves </p>}
        </div>
      )}
    </>
  );
}
FavButton.defaultProps = {
  remove: false,
};
export default FavButton;
