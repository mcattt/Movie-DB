import { IoAddCircle } from "react-icons/io5";
import { IoRemoveCircle } from "react-icons/io5";
import { useState } from "react";
import addButton from "/assets/images/add-icon.png";
import removeButton from "/assets/images/remove-icon.png";
function FavButton({ movie, remove, handleFavClick }) {
  const [clicked, setClicked] = useState(false);

  function handleAddFav() {
    console.log("Adding to favorites");
    // setClicked(true);
    handleFavClick(true, movie);
  }

  function handleRemoveFav() {
    console.log("Removing from favorites");
    // setClicked(false);
    handleFavClick(false, movie);
  }
  console.log(`Remove:${remove}`);
  return (
    <>
      {remove === false ? (
        <div onClick={handleAddFav}>
          <img className="w-[40px]" src={addButton} alt="" />
        </div>
      ) : (
        <div onClick={handleRemoveFav}>
          <img className="w-[40px]" src={removeButton} alt="" />
        </div>
      )}
    </>
  );
}
FavButton.defaultProps = {
  remove: false,
};
export default FavButton;
