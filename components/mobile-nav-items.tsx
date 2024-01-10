"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

const MobileNavItems = () => {
  const { setTheme } = useTheme();

  const handleLogOut = () => {
    signOut();
  };
  return (
    <>
      <div className="flex items-center">
        <Button
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
              }),
              "justify-start bg-transparent text-foreground px-3"
            )}
          >
            <Icons.moonStar className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <Icons.sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            Mode toggle
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="flex items-center gap-2"
          >
            <Icons.sun className="w-3.5 aspect-square" /> Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="flex items-center gap-2"
          >
            <Icons.moonStar className="w-3.5 aspect-square" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="flex items-center gap-2"
          >
            <Icons.monitor className="w-3.5 aspect-square" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
    </>
  );
};

export default MobileNavItems;
