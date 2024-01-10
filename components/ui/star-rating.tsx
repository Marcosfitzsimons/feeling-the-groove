import { useTheme } from "next-themes";
import { Icons } from "../icons";

interface StarRatingProps {
  rank: number;
}

export const StarRating = ({ rank }: StarRatingProps) => {
  const stars = [];
  const { theme } = useTheme();

  for (let i = 0; i < rank; i++) {
    stars.push(
      <Icons.star
        key={i}
        className="w-[18px] h-[18px]"
        fill={theme === "light" ? "#fcd34d" : "#fef08a"}
        strokeWidth={0}
      />
    );
  }

  return (
    <div className="flex items-center justify-center gap-1 bg-accent p-0.5 px-2 rounded-md">
      {stars}
    </div>
  );
};
