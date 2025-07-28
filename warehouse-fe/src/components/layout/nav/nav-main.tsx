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

export function NavMain({
  items,
}: {
  readonly items: readonly {
    readonly title: string;
    readonly url: string;
    readonly icon?: React.JSX.Element;
    readonly isActive?: boolean;
    readonly items?: readonly {
      readonly title: string;
      readonly url: string;
      readonly icon?: React.JSX.Element;
    }[];
  }[];
}) {
  const t = useTranslations("navigation");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={t(item.title as string)}
                  className="pr-0"
                >
                  {item.icon && item.icon}
                  <span>{t(item.title as string)}</span>
                  {item?.items && item.items.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {item?.items && item.items.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub className="mx-0 space-y-2">
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild className="">
                          <div>
                            <span>{subItem?.icon && subItem.icon}</span>
                            <a href={subItem.url}>
                              <span>{t(subItem.title as string)}</span>
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
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
