import { correctDateFormat } from "@/lib/utils";
import { Rave } from "@/types";
import { StarRating } from "./ui/star-rating";
import Image from "next/image";
import UpdateRave from "./update-rave";

interface SingleRaveProps {
  rave: Rave;
}

const SingleRave = ({ rave }: SingleRaveProps) => {
  return (
    <div className="">
      <div className="w-full md:max-w-lg flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold flex items-center gap-2">
            <Image
              className=""
              src="/party.png"
              alt="party"
              width={32}
              height={32}
            />
            {rave.name}
          </h2>
          <div className="self-start">
            {rave.rank > 3 ? (
              <div className="flex items-center gap-3">
                <StarRating rank={rave.rank} />
                <span className="select-none">😎🥳✨🎉🎊</span>
              </div>
            ) : rave.rank === 1 ? (
              <div className="flex items-center gap-3">
                <StarRating rank={rave.rank} />
                <span className="select-none">🤮💩👎🤡❌</span>
              </div>
            ) : (
              <StarRating rank={rave.rank} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <ul className="flex justify-between">
            <div className="flex flex-col gap-1">
              <li className="flex items-center gap-1">
                <span className="font-semibold">Date:</span>
                {correctDateFormat(rave.date)}
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold">Location:</span>
                {rave.location}
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold">Djs:</span>
                {rave.djs}
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold">Genre:</span>
                {rave.genre}
              </li>
            </div>
            <div className="flex flex-col gap-1">
              <li className="flex items-center gap-1">
                <span className="font-semibold">Ayn:</span>
                {rave.ayn}
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold">Genre:</span>
                {rave.genre}
              </li>
              {rave.candy && (
                <>
                  <li className="flex items-center gap-1">
                    <span className="font-semibold">Candy:</span>
                    {rave.candy}
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="font-semibold">Quantity:</span>
                    {rave.quantity}
                  </li>
                </>
              )}
            </div>
          </ul>
          {rave.anecdotes && (
            <div className="">
              <p className="font-semibold">Memories</p>

              <div className="p-2 max-w-md flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Image
                    className=""
                    src="/pin.png"
                    alt="pin"
                    width={20}
                    height={20}
                  />
                  <p className="text-muted-foreground text-sm italic">
                    Moments to remember...
                  </p>
                </div>
                <p className="px-4">{rave.anecdotes}</p>
              </div>
            </div>
          )}
          <UpdateRave rave={rave} />
        </div>
      </div>
    </div>
  );
};

export default SingleRave;
