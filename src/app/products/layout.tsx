"use client";

import React from "react";
import { Nav } from "./nav";
import { Archive, Layers, Box, ScrollText, Trash2 } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { isMobile } from "react-device-detect"

export default function ProductsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const defaultLayout: Readonly<number[]> = [20, 80];
  const defaultCollapsed: Readonly<boolean> = isMobile;
  const navCollapsedSize: Readonly<number> = 4;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:products=${JSON.stringify(sizes)}`;
        }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Products",
                label: "128",
                icon: Box,
                variant: "ghost",
                link: "/products",
              },
              {
                title: "Category",
                label: "9",
                icon: Layers,
                variant: "ghost",
                link: "/products/category",
              },
              {
                title: "Audit Log",
                label: "",
                icon: ScrollText,
                variant: "ghost",
                link: "/products/audit-log",
              },
              {
                title: "Trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
                link: "/products/trash",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
                link: "/products/archive",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={80}>
          <main className="flex items-center justify-center">{children}</main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
