import { useState } from "react";
import { Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";

function StarRating(vote_average) {
  const [isZero, setIsZero] = useState(false);

  if (vote_average < 0.5) {
    setIsZero(true);
  }

  return (
    <>
      {isZero ? (
        <Rate defaultValue={5} disabled character={<StarOutlined />} />
      ) : (
        <Rate defaultValue={vote_average / 2} allowHalf disabled />
      )}
    </>
  );
}
export default StarRating;
