"use client";

import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface SignOutProps {
  isCollapsed: boolean;
}

const SignOut = ({ isCollapsed }: SignOutProps) => {
  const handleLogOut = () => {
    signOut();
  };
  return (
    <>
      {isCollapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                }),
                "bg-transparent text-foreground p-0 h-9 w-9"
              )}
              onClick={handleLogOut}
            >
              <Icons.logout className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            Log out
          </TooltipContent>
        </Tooltip>
      ) : (
        <Button
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
            }),
            "justify-start bg-transparent text-foreground px-3"
          )}
          onClick={handleLogOut}
        >
          <Icons.logout className="mr-2 h-4 w-4" />
          Log out
        </Button>
      )}
    </>
  );
};

export default SignOut;
