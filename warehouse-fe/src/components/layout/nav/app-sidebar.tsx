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
} from "react-icons/md";

import { NavMain } from "@/components/layout/nav/nav-main";
import { NavProjects } from "@/components/layout/nav/nav-projects";
import { NavUser } from "@/components/layout/nav/nav-user";
import { TeamSwitcher } from "@/components/layout/nav/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Dashboard from "@/app/(auth)/(dashboard)/page";
import { Icons } from "@/components/common/icons";
import { RiLuggageCartFill } from "react-icons/ri";
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
  navMain: [
    {
      title: "dashboard",
      url: "/#",
      icon: <Icons.Dashboard />,
      isActive: true,
    },
    {
      title: "warehouseManagement",
      url: "/#",
      icon: <RiLuggageCartFill />,
      items: [
        {
          title: "inbound",
          url: "/#",
          icon: <RxDownload />,
        },
        {
          title: "inboundHistory",
          url: "/#",
          icon: <GrHistory />,
        },
      ],
    },
    {
      title: "outboundManagement",
      url: "#",
      icon: <LiaOpencart />,
      items: [
        {
          title: "outbound",
          url: "#",
          icon: <RxUpload />,
        },
        {
          title: "outboundHistory",
          url: "#",
          icon: <GrHistory />,
        },
      ],
    },
    {
      title: "storageManagement",
      url: "#",
      icon: <MdArchive />,
      items: [
        {
          title: "planManagement",
          url: "#",
          icon: <MdCalendarToday />,
        },
        {
          title: "productManagement",
          url: "#",
          icon: <MdShoppingCart />,
        },
        {
          title: "defectiveProductManagement",
          url: "#",
          icon: <MdWarning />,
        },
      ],
    },
    {
      title: "laborManagement",
      url: "#",
      icon: <MdTrendingUp />,
    },
    {
      title: "systemSettings",
      url: "#",
      icon: <MdSettings />,
      items: [
        {
          title: "storageConfiguration",
          url: "#",
          icon: <MdStorage />,
        },
        {
          title: "systemLog",
          url: "#",
          icon: <MdDescription />,
        },
      ],
    },
  ],
  projects: [
    {
      name: "designEngineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "salesMarketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "travel",
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
      <SidebarContent className="scrollbar overflow-auto">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
