import { Icons } from "../icons";

interface StarRatingProps {
  rank: number;
}

export const StarRating = ({ rank }: StarRatingProps) => {
  const stars = [];

  for (let i = 0; i < rank; i++) {
    stars.push(
      <Icons.star
        key={i}
        className="w-[18px] h-[18px]"
        fill="#fef08a"
        strokeWidth={0}
      />
    );
  }

  return <div className="flex items-center justify-center gap-1">{stars}</div>;
};
