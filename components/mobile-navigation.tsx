"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { navConfig } from "@/config/nav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "./ui/separator";
import Logo from "./logo";
import MobileNavItems from "./mobile-nav-items";

export function MobileNavigation() {
  const pathname = usePathname();

  // to do:
  // Display user info from Header (RSC)
  // Doesn't works
  // Get error when I tried to get user info

  return (
    <div className="w-9 grid grid-cols-2 gap-2 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "bg-transparent text-foreground p-0 h-9 w-9"
            )}
          >
            <Icons.ellipsis className="h-4 w-4" />
            <span className="sr-only">AI predictions</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-2">
          <SheetHeader className="mt-4 mb-2">
            <SheetTitle className="flex h-[52px] items-center justify-center text-start">
              <Logo />
              {/* <UserAccount user={user} /> */}
            </SheetTitle>
          </SheetHeader>
          <nav className="w-full grid gap-1">
            {navConfig.mainNav.map((navItem) => {
              return (
                <Link
                  key={navItem.title}
                  href={navItem.link} // Updated to use the link property
                  className={cn(
                    buttonVariants({
                      variant: pathname === navItem.link ? "default" : "ghost",
                      size: "sm",
                    }),
                    pathname === navItem.link &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  )}
                >
                  <navItem.icon className="mr-2 h-4 w-4" />
                  {navItem.title}
                </Link>
              );
            })}
          </nav>
          <Separator />
          <MobileNavItems />
          <SheetFooter className="mt-4"></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
