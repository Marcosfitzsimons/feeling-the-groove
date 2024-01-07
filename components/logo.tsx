import { Icons } from "./icons";

const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      <Icons.logo className="mx-auto h-6 w-6" />
      <span className="text-xs font-medium relative bottom-0.5 select-none">
        Feeling the Groove
      </span>
    </div>
  );
};

export default Logo;
