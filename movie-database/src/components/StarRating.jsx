import { useState } from "react";
import { Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";

function StarRating({ vote_average }) {
  const [isZero, setIsZero] = useState(false);

  // THIS IF CONDITION BREAKS THE SEARCH FUINCTION
  // if (
  //   vote_average === null ||
  //   vote_average === undefined ||
  //   vote_average < 0.5
  // ) {
  //   setIsZero(true);
  // }

  return (
    <>
      {isZero ? (
        <Rate defaultValue={5} disabled character={<StarOutlined />} />
      ) : (
        // Something is off with the visual star representation vs vote number
        <Rate defaultValue={vote_average / 2} allowHalf disabled />
      )}
    </>
  );
}
export default StarRating;
