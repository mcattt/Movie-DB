import { Rating } from "@mui/material";

function StarRating({ vote_average }) {
  return (
    <>
      <Rating
        name="movie-rating"
        value={Math.max(vote_average / 2)}
        precision={0.1}
        readOnly
        sx={{
          "& .MuiRating-iconFilled": {
            color: "yellow",
          },
          "& .MuiRating-iconEmpty": {
            color: "grey",
          },
        }}
      />
    </>
  );
}
export default StarRating;
