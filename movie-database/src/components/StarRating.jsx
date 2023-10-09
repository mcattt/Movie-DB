import { Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { Rating } from "@mui/material";

function StarRating({ vote_average }) {
  return (
    <>
      <Rating
        name="movie-rating"
        value={Math.max(vote_average / 2)}
        precision={0.1}
        readOnly
        // https://mui.com/material-ui/customization/how-to-customize/
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
