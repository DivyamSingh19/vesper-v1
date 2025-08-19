"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, User, LogOut } from "lucide-react";

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

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const sidebarNav = [
  {
    title: "Appointment",
    basePath: "/dashboard/lawyer/appointments",
    baseLink: null,
    items: [
      { title: "Add Blog", path: "/add-blog" },
      { title: "All Blogs", path: "/all-blogs" },
    ],
  },
  {
    title: "Vesper-ai",
    basePath: "/dashboard/lawyer/vesper-ai",
    baseLink: null,
    items: [],
  },
];

export default function LawyerSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUserEmail(localStorage.getItem("email"));
      setUserRole(localStorage.getItem("role"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login"); // redirect to login page
  };

  return (
    <Sidebar {...props}>
      {/* --- Header --- */}
      <SidebarHeader className="p-4 border-b">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Branding */}
        <h1 className="mt-4 text-xl font-bold text-sidebar-foreground tracking-wide">
          Vesper AI
        </h1>
      </SidebarHeader>

      {/* --- Main Nav --- */}
      <SidebarContent className="gap-0 flex-1">
        {sidebarNav.map((group) => (
          <Collapsible
            key={group.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="text-sidebar-foreground text-sm"
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    {group.baseLink ? (
                      <>
                        <Link href={group.baseLink} className="flex-1 text-left">
                          {group.title}
                        </Link>
                        <ChevronRight className="ml-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-left">{group.title}</span>
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

      {/* --- User Info with Hover Logout --- */}
      <div className="p-4 border-t">
        <HoverCard openDelay={100}>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-gray-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <User size={20} className="text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {userEmail || "Guest"}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {userRole || "No role"}
                </span>
              </div>
            </div>
          </HoverCardTrigger>

          <HoverCardContent side="top" align="end" className="p-2 w-40">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full flex items-center justify-start gap-2 text-red-600 hover:bg-red-100"
            >
              <LogOut size={16} />
              Log out
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
