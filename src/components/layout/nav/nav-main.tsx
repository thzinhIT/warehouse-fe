"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavMain({
  items,
}: {
  readonly items: {
    title: string;
    url: string;
    icon?: React.JSX.Element;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: React.JSX.Element;
    }[];
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const tDashboard = useTranslations("dashboard.sidebar");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{tDashboard("platform")}</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {items.map((item) => {
          const isActive =
            pathname?.endsWith(item?.url) ||
            (pathname?.startsWith(item?.url) && item?.url !== "/");
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && item.icon}
                    <div
                      className={cn(
                        "w-full p-1 pl-2 hover:bg-secondary flex items-center gap-2 text-sm rounded-md font-semibold",
                        isActive && "bg-muted"
                      )}
                      onClick={() => {
                        if (!item?.items) {
                          router.push(item?.url);
                        }
                      }}
                    >
                      <span
                        className={cn("", isActive && "bg-muted text-primary")}
                      >
                        {t(item.title)}
                      </span>
                      {item?.items && item.items.length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item?.items && item.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="mx-0 space-y-2 mt-2">
                      {item.items?.map((subItem) => {
                        const isActive =
                          pathname?.endsWith(subItem?.url) ||
                          (pathname?.startsWith(subItem?.url) &&
                            subItem?.url !== "/");
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <div
                                className={cn(
                                  "w-full hover:bg-secondary",
                                  isActive && "bg-muted"
                                )}
                              >
                                <span>{subItem?.icon && subItem.icon}</span>
                                <a href={subItem.url} className="w-full">
                                  <span
                                    className={cn(
                                      "",
                                      isActive && "bg-muted text-primary"
                                    )}
                                  >
                                    {t(subItem.title)}
                                  </span>
                                </a>
                              </div>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
