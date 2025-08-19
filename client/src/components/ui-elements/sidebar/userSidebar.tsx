"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
 
 

const sidebarNav = [
  {
    title: "Blogs",
    basePath: "/dashboard/blogs",
    baseLink: null,
    items: [
      { title: "Add Blog", path: "/add-blog" },
      { title: "All Blogs", path: "/all-blogs" },
    ],
  },
  {
    title: "Events",
    basePath: "/dashboard/events",
    baseLink: null,
    items: [
      { title: "Add Event", path: "/add-event" },
      { title: "All Events", path: "/all-events" },
    ],
  },
  {
    title: "Investor Hub",
    basePath: "/dashboard/investor-hub",
    baseLink: null,
    items: [
      { title: "Add Post", path: "/add-post" },
      { title: "All Post", path: "/all-post" },
    ],
  },
  {
    title: "Products",
    basePath: "/dashboard/products",
    baseLink: null, // No base link for Products
    items: [
      { title: "Add Products", path: "/add-products" },
      { title: "All Products", path: "/all-products" },
    ],
  },
  {
    title: "Achievements",
    basePath: "/dashboard/achievement",
    baseLink: null, // No base link for Products
    items: [
      { title: "Add Achievement", path: "/add-achievement" },
      { title: "All Achievements", path: "/all-achievements" },
    ],
  }
];

export default function UserSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        
        <div className="pt-10" />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {sidebarNav.map((group) => (
          <Collapsible
            key={group.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              {/* Top-level label */}
              <SidebarGroupLabel
                asChild
                className="text-sidebar-foreground text-sm"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    {/* Conditional rendering based on whether baseLink exists */}
                    {group.baseLink ? (
                      <>
                        {/* Label as a Link for sections with base links */}
                        <Link href={group.baseLink} className="flex-1 text-left">
                          {group.title}
                        </Link>
                        {/* Chevron to toggle */}
                        <ChevronRight className="ml-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </>
                    ) : (
                      <>
                        {/* Label as plain text for sections without base links */}
                        <span className="flex-1 text-left">
                          {group.title}
                        </span>
                        {/* Chevron to toggle */}
                        <ChevronRight className="ml-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </>
                    )}
                  </div>
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              {/* Submenu items */}
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const fullPath = `${group.basePath}${item.path}`;
                      const isActive = pathname === fullPath;

                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={fullPath}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarRail />
      {/* <SidebarUserInfo/> */}
    </Sidebar>
  );
}