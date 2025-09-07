"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react";

import {
  MdDashboard,
  MdWarehouse,
  MdLocalShipping,
  MdWarning,
} from "react-icons/md";
import { IoSave } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { GoClockFill } from "react-icons/go";
import { GiBoxUnpacking } from "react-icons/gi";
import { BiCabinet } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdNoteAlt } from "react-icons/md";

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
    avatar: "/logo-warehouse.jpg",
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
      url: "/",
      icon: <MdDashboard className="text-blue-500 " size={18} />,

      isActive: true,
    },
    {
      title: "warehouse-management",
      url: "/manage-warehouse",
      icon: <MdWarehouse className="text-red-400" size={18} />,
      items: [
        {
          title: "stock-in",
          url: "/manage-warehouse/stock-in",
          icon: <HiArchiveBoxArrowDown className="text-yellow-500" />,
        },
        {
          title: "stock-in-history",
          url: "/manage-warehouse/history",
          icon: <GoClockFill className="text-amber-800" />,
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
          url: "/manage-export/history",
          icon: <GoClockFill className="text-amber-800" />,
        },
      ],
    },
    {
      title: "storage-management",
      url: "/manage-storage",
      icon: <IoSave className="text-amber-800" size={18} />,
      items: [
        {
          title: "shelves-management",
          url: "/manage-storage/shelves",
          icon: <BiCabinet className="text-orange-500" />,
        },
        {
          title: "product-management",
          url: "/manage-storage/product",
          icon: <FaBoxOpen className="text-amber-500" />,
        },
        {
          title: "defective-product-management",
          url: "/manage-storage/error-product",
          icon: <MdWarning />,
        },
      ],
    },
    {
      title: "employee-management",
      url: "/manage-employee",
      icon: <FaUserEdit className="text-cyan-600" size={18} />,
    },
    {
      title: "system-settings",
      url: "#",
      icon: <FcSettings size={18} />,
      items: [
        {
          title: "system-logs",
          url: "#",
          icon: <MdNoteAlt className="text-red-600" />,
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
      <SidebarContent className="scrollbar overflow-auto">
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <div className="flex items-center justify-between p-2">
          <LanguageSwitcher />
        </div> */}
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
