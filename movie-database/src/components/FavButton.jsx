import { IoAddCircle } from "react-icons/io5";
import { IoRemoveCircle } from "react-icons/io5";

function FavButton({ movie, remove, handleFavClick }) {
  function handleAddFav() {
    handleFavClick(true, movie);
  }

  function handleRemoveFav() {
    handleFavClick(false, movie);
  }

  return (
    <>
      {remove === false ? (
        <IoAddCircle onClick={handleAddFav} />
      ) : (
        <IoRemoveCircle onClick={handleRemoveFav} />
      )}
    </>
  );
}
FavButton.defaultProps = {
  remove: false,
};
export default FavButton;
