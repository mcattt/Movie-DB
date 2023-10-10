import addButton from "/assets/images/add-icon.png";
import removeButton from "/assets/images/remove-icon.png";
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
