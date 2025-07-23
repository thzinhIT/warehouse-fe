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
      title: "Dashboard",
      url: "/#",
      icon: <Icons.Dashboard />,
      isActive: true,
    },
    {
      title: "Quản lý kho hàng",
      url: "/#",
      icon: <RiLuggageCartFill />,
      items: [
        {
          title: "Nhập kho",
          url: "/#",
          icon: <RxDownload />,
        },
        {
          title: "Lịch sử nhập kho",
          url: "/#",
          icon: <GrHistory />,
        },
      ],
    },
    {
      title: "Quản lý xuất kho",
      url: "#",
      icon: <LiaOpencart />,
      items: [
        {
          title: "Xuất kho",
          url: "#",
          icon: <RxUpload />,
        },
        {
          title: "Lịch sử xuất kho",
          url: "#",
          icon: <GrHistory />,
        },
      ],
    },
    {
      title: "Quản lý lưu trữ",
      url: "#",
      icon: <MdArchive />,
      items: [
        {
          title: "Quản lý kế hoạch",
          url: "#",
          icon: <MdCalendarToday />,
        },
        {
          title: "Quản lý sản phẩm",
          url: "#",
          icon: <MdShoppingCart />,
        },
        {
          title: "Quản lý sản phẩm lỗi",
          url: "#",
          icon: <MdWarning />,
        },
      ],
    },
    {
      title: "Quản lý lao động",
      url: "#",
      icon: <MdTrendingUp />,
    },
    {
      title: "Cài đặt hệ thống",
      url: "#",
      icon: <MdSettings />,
      items: [
        {
          title: "Cấu hình lưu trữ",
          url: "#",
          icon: <MdStorage />,
        },
        {
          title: "Nhật ký hệ thống",
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
