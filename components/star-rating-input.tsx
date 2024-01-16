"use client";

import { useState } from "react";
import { Icons } from "./icons";
import { useTheme } from "next-themes";

interface StarRatingInputProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const StarRatingInput = ({ rating, setRating }: StarRatingInputProps) => {
  const { theme } = useTheme();

  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Icons.star
            key={index}
            className="w-[18px] h-[18px] cursor-pointer transition-colors"
            fill={
              index <= (hover || rating)
                ? theme === "dark"
                  ? "#fef08a"
                  : "#fcd34d"
                : "#e2e8f0"
            }
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
