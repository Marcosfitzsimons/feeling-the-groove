"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import UserAccount from "./user-account";
import SideBarItems from "./side-bar-items";
import { Nav } from "./nav";
import { Icons } from "./icons";
import NewRaveForm from "./new-rave-form";

interface NewRaveResizableContainerProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  user: Pick<User, "name" | "image" | "email" | "id">;
  nearestPastDate: Date | null;
}

const NewRaveResizableContainer = ({
  user,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  nearestPastDate,
}: NewRaveResizableContainerProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={18}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <UserAccount
              isCollapsed={isCollapsed}
              user={{
                name: user.name || null,
                image: user.image || null,
                email: user.email || null,
              }}
            />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Raves",
                icon: Icons.party,
                link: "/raves",
              },
              {
                title: "New Rave",
                icon: Icons.calendarPlus,
                link: "/raves/new-rave",
              },
            ]}
          />
          <Separator />
          <SideBarItems isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="h-screen mx-4">
            <h2 className="text-3xl font-semibold mb-4">Create New Rave</h2>
            <NewRaveForm
              nearestPastDate={nearestPastDate}
              user={{ id: user.id }}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default NewRaveResizableContainer;
