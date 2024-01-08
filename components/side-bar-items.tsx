import AiButton from "./buttons/ai-button";
import { ModeToggle } from "./buttons/mode-toggle";
import SignOut from "./buttons/sign-out";

interface SideBarItemsProps {
  isCollapsed: boolean;
}

const SideBarItems = ({ isCollapsed }: SideBarItemsProps) => {
  return (
    <div>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <div className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          <AiButton isCollapsed={isCollapsed} />
          <ModeToggle isCollapsed={isCollapsed} />
          <SignOut isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default SideBarItems;
