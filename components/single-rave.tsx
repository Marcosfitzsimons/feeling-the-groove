import { Rave } from "@/types";

interface SingleRaveProps {
  rave: Rave;
}

const SingleRave = async ({ rave }: SingleRaveProps) => {
  return <div>SingleRave for: {rave.name}</div>;
};

export default SingleRave;
