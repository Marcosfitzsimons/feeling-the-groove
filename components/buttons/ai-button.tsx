import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface AiButtonProps {
  isCollapsed: boolean;
}
const AiButton = ({ isCollapsed }: AiButtonProps) => {
  return (
    <>
      {isCollapsed ? (
        <div className="relative flex justify-center mb-1">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  }),
                  "bg-transparent text-foreground p-0 h-9 w-9 opacity-40 cursor-default hover:bg-transparent"
                )}
              >
                <Icons.magic className="h-4 w-4" />
                <span className="sr-only">AI predictions</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              AI predictions
            </TooltipContent>
          </Tooltip>
          <span className="absolute -bottom-1 select-none text-white text-[8px] font-medium rounded-sm px-1 bg-violet-600 uppercase">
            soon
          </span>
        </div>
      ) : (
        <div className="flex items-center">
          <Button
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "md",
              }),
              " justify-start bg-transparent text-foreground px-3 "
            )}
            disabled
          >
            <Icons.magic className="mr-2 h-4 w-4" />
            AI predictions
          </Button>
          <span className="select-none text-white text-xs font-medium rounded-sm px-2 py-0.5 bg-violet-600 uppercase">
            soon
          </span>
        </div>
      )}
    </>
  );
};

export default AiButton;
