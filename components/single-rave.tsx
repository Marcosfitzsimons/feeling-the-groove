import { correctDateFormat } from "@/lib/utils";
import { Rave } from "@/types";
import { StarRating } from "./ui/star-rating";
import Image from "next/image";
import UpdateRave from "./update-rave";
import RaveMemories from "./rave-memories";
import AddRaveMemories from "./add-raves-memories";

interface SingleRaveProps {
  rave: Rave;
}

const SingleRave = ({ rave }: SingleRaveProps) => {
  return (
    <div className="">
      <div className="w-full flex flex-col gap-8 md:max-w-lg">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold flex items-center gap-2 md:text-4xl">
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
                <StarRating isLarge={true} rank={rave.rank} />
                <span className="select-none">😎🥳✨🎉🎊</span>
              </div>
            ) : rave.rank === 1 ? (
              <div className="flex items-center gap-3">
                <StarRating isLarge={true} rank={rave.rank} />
                <span className="select-none">🤮💩👎🤡❌</span>
              </div>
            ) : (
              <StarRating isLarge={true} rank={rave.rank} />
            )}
          </div>
        </div>
        <div className="text-sm flex flex-col gap-5 md:text-base">
          <ul className="flex justify-between">
            <div className="flex flex-col gap-1">
              <li className="flex items-center gap-1">
                <span className="font-semibold">Date:</span>
                {rave.date && correctDateFormat(rave.date)}
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
          {rave.memories ? (
            <RaveMemories raveId={rave.id} memories={rave.memories} />
          ) : (
            <div className="">
              <div className="flex items-centar gap-1">
                <p className="font-semibold">Memories</p>
              </div>

              <div className="p-2 max-w-md flex flex-col gap-1">
                <p className="text-sm ">There are no memories, add one!</p>

                <AddRaveMemories raveId={rave.id} />
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
