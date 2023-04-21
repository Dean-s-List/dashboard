import React from "react";
import type { FC } from "react";

interface Props {
  stars: number;
}

const Rating: FC<Props> = ({ stars }) => (
  <div className="rating">
    <input
      type="radio"
      name="rating"
      className="bg-orange-400 hover:bg-orange-400 mask mask-star-2"
      checked={stars == 1 ? true : false}
    />
    <input
      type="radio"
      name="rating"
      className="bg-orange-400 hover:bg-orange-400 mask mask-star-2"
      checked={stars == 2 ? true : false}
    />
    <input
      type="radio"
      name="rating"
      className="bg-orange-400 hover:bg-orange-400 mask mask-star-2"
      checked={stars == 3 ? true : false}
    />
    <input
      type="radio"
      name="rating"
      className="bg-orange-400 hover:bg-orange-400 mask mask-star-2"
      checked={stars == 4 ? true : false}
    />
    <input
      type="radio"
      name="rating"
      className="bg-orange-400 hover:bg-orange-400 mask mask-star-2"
      checked={stars == 5 ? true : false}
    />
  </div>
);

export default Rating;
