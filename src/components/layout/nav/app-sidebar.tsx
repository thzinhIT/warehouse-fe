"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  icons,
  Map,
  PieChart,
  Save,
  SaveIcon,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import {
  MdArchive,
  MdCalendarToday,
  MdShoppingCart,
  MdWarning,
  MdTrendingUp,
  MdSettings,
  MdStorage,
  MdDescription,
  MdShelves,
  MdSdStorage,
} from "react-icons/md";

import { NavMain } from "@/components/layout/nav/nav-main";
import { NavProjects } from "@/components/layout/nav/nav-projects";
import { NavUser } from "@/components/layout/nav/nav-user";
import { TeamSwitcher } from "@/components/layout/nav/team-switcher";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Dashboard from "@/app/(auth)/(dashboard)/page";
import { Icons } from "@/components/common/icons";
import { RiLuggageCartFill, RiStopLargeLine } from "react-icons/ri";
import { RxDownload, RxUpload } from "react-icons/rx";
import { GrHistory } from "react-icons/gr";
import { LiaOpencart } from "react-icons/lia";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  // navMain: [
  //   {
  //     title: "Playground",
  //     url: "#",
  //     icon: SquareTerminal,
  //     isActive: true,
  //     items: [
  //       {
  //         title: "History",
  //         url: "#",
  //       },
  //       {
  //         title: "Starred",
  //         url: "#",
  //       },
  //       {
  //         title: "Settings",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Models",
  //     url: "#",
  //     icon: Bot,
  //     items: [
  //       {
  //         title: "Genesis",
  //         url: "#",
  //       },
  //       {
  //         title: "Explorer",
  //         url: "#",
  //       },
  //       {
  //         title: "Quantum",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Documentation",
  //     url: "#",
  //     icon: BookOpen,
  //     items: [
  //       {
  //         title: "Introduction",
  //         url: "#",
  //       },
  //       {
  //         title: "Get Started",
  //         url: "#",
  //       },
  //       {
  //         title: "Tutorials",
  //         url: "#",
  //       },
  //       {
  //         title: "Changelog",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: Settings2,
  //     items: [
  //       {
  //         title: "General",
  //         url: "#",
  //       },
  //       {
  //         title: "Team",
  //         url: "#",
  //       },
  //       {
  //         title: "Billing",
  //         url: "#",
  //       },
  //       {
  //         title: "Limits",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  navMain: [
    {
      title: "dashboard",
      url: "/",
      icon: <Icons.Dashboard />,
      isActive: true,
    },
    {
      title: "warehouse-management",
      url: "/manage-warehouse",
      icon: <RiLuggageCartFill />,
      items: [
        {
          title: "stock-in",
          url: "/manage-warehouse/stock-in",
          icon: <RxDownload />,
        },
        {
          title: "stock-in-history",
          url: "/manage-warehouse/history",
          icon: <GrHistory />,
        },
      ],
    },
    {
      title: "stock-out-management",
      url: "/manage-export",
      icon: <LiaOpencart />,
      items: [
        {
          title: "stock-out",
          url: "/manage-export/stock-out",
          icon: <RxUpload />,
        },
        {
          title: "stock-out-history",
          url: "#",
          icon: <GrHistory />,
        },
      ],
    },
    {
      title: "storage-management",
      url: "/manage-storage",
      icon: <SaveIcon />,
      items: [
        {
          title: "shelves-management",
          url: "/manage-storage/shelves",
          icon: <MdShelves />,
        },
        {
          title: "product-management",
          url: "/manage-storage/product",
          icon: <MdShoppingCart />,
        },
        {
          title: "defective-product-management",
          url: "#",
          icon: <MdWarning />,
        },
      ],
    },
    {
      title: "labor-management",
      url: "/manage-employee",
      icon: <MdTrendingUp />,
    },
    {
      title: "system-settings",
      url: "#",
      icon: <MdSettings />,
      items: [
        {
          title: "storage-configuration",
          url: "#",
          icon: <MdStorage />,
        },
        {
          title: "system-logs",
          url: "#",
          icon: <MdDescription />,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="scrollbar overflow-aut">
        <NavMain items={data.navMain} />o
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-2">
          <LanguageSwitcher />
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
