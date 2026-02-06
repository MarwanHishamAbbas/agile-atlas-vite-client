

import { Link, useLocation } from "@tanstack/react-router";
import { buttonVariants } from "./ui/button";
import type { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";

export function NavMenu({
  items,
}: {
  items: Array<{
    name: string
    url: string
    icon: LucideIcon
  }>
}) {
  const { pathname } = useLocation()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>MENU</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link activeProps={{ className: 'bg-white text-neutral-900' }} className={buttonVariants({ variant: "ghost", className: "justify-start font-normal" })} to={item.url}>
                <item.icon className={cn(item.url === pathname ? 'stroke-primary' : 'stroke-neutral-400')} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
