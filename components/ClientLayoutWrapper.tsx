"use client ";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideBar from "@/components/side-bar";
import { usePathname } from "next/navigation";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

const ClientLayoutWrapper = ({ children }: ClientLayoutWrapperProps) => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/login" ? (
        <>
          <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border"
          >
            <ResizablePanel defaultSize={25}>
              <SideBar />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <div className="min-h-screen w-full">{children}</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </>
      ) : (
        <div className="min-h-screen w-full">{children}</div>
      )}
    </>
  );
};

export default ClientLayoutWrapper;
