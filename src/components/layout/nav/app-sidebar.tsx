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
  LayoutDashboard,
  LayoutDashboardIcon,
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
import { MdDashboard, MdWarehouse, MdLocalShipping } from "react-icons/md";
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
          icon: <HiArchiveBoxArrowDown />,
        },
        {
          title: "stock-in-history",
          url: "/manage-warehouse/history",
          icon: <GoClockFill />,
        },
      ],
    },
    {
      title: "stock-out-management",
      url: "/manage-export",
      icon: <MdLocalShipping className="text-green-600" size={18} />,
      items: [
        {
          title: "stock-out",
          url: "/manage-export/stock-out",
          icon: <GiBoxUnpacking />,
        },
        {
          title: "stock-out-history",
          url: "#",
          icon: <GoClockFill />,
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
          icon: <BiCabinet />, // xanh ngọc
        },
        {
          title: "product-management",
          url: "/manage-storage/product",
          icon: <FaBoxOpen />, // hồng
        },
        {
          title: "defective-product-management",
          url: "#",
          icon: <FaExclamationTriangle />, // vàng cảnh báo
        },
      ],
    },
    {
      title: "employee-management",
      url: "/manage-employee",
      icon: <FaUserEdit className="text-cyan-600" size={18} />, // xanh ngọc đậm
    },
    {
      title: "system-settings",
      url: "#",
      icon: <FcSettings size={18} />,
      items: [
        {
          title: "system-logs",
          url: "#",
          icon: <MdNoteAlt />, // cam
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
