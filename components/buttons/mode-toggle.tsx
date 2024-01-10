"use client";

import * as React from "react";
import { Icons } from "../icons";
import { useTheme } from "next-themes";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface ModeToggleProps {
  isCollapsed: boolean;
}

export function ModeToggle({ isCollapsed }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  const handleToggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
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
                "z-50 bg-transparent text-foreground p-0 h-9 w-9"
              )}
              onClick={handleToggleTheme}
            >
              <Icons.moonStar className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <span className="sr-only">Mode toggle</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            Mode toggle
          </TooltipContent>
        </Tooltip>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "md",
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
      )}
    </>
  );
}
