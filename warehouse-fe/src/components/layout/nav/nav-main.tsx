"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {items.map((item) => {
          const isActive =
            pathname?.endsWith(item?.url) ||
            (pathname?.startsWith(item?.url) && item?.url !== "/");
          console.log("isActive", isActive);
          console.log("pathname", pathname);
          console.log("item?.url", item?.url);
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      " w-full p-1 pl-2 hover:bg-secondary flex items-center gap-2 text-sm rounded-md font-semibold",
                      isActive && "bg-muted text-primary  "
                    )}
                    onClick={() => {
                      if (!item?.items) {
                        router.push(item?.url);
                      }
                    }}
                  >
                    {item.icon && item.icon}

                    <span>{item.title}</span>
                    {item?.items && item.items.length > 0 && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </button>
                </CollapsibleTrigger>

                {item?.items && item.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="mx-0 space-y-2">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="">
                            <div>
                              {" "}
                              <span>{subItem?.icon && subItem.icon}</span>
                              <a href={subItem.url} className="w-full">
                                <span>{subItem.title}</span>
                              </a>
                            </div>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
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
