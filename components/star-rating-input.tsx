"use client";

import { useState } from "react";
import { Icons } from "./icons";

interface StarRatingInputProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const StarRatingInput = ({ rating, setRating }: StarRatingInputProps) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Icons.star
            key={index}
            className="w-[18px] h-[18px] cursor-pointer transition-colors"
            fill={index <= (hover || rating) ? "#fef08a" : "#a1a1aa"}
            strokeWidth={0}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          />
        );
      })}
    </div>
  );
};

export default StarRatingInput;
