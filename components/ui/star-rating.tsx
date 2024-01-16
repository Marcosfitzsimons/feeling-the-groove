"use client";

import { useTheme } from "next-themes";
import { Icons } from "../icons";

interface StarRatingProps {
  rank: number;
  isLarge?: boolean;
}

export const StarRating = ({ rank, isLarge }: StarRatingProps) => {
  const { theme } = useTheme();
  const stars = [];

  for (let i = 0; i < rank; i++) {
    stars.push(
      <Icons.star
        key={i}
        className={isLarge ? "w-[22px] h-[22px]" : "w-[18px] h-[18px]"}
        fill={theme === "dark" ? "#fef08a" : "#fcd34d"}
        strokeWidth={0}
      />
    );
  }

  return <div className="flex items-center justify-center gap-1">{stars}</div>;
};
