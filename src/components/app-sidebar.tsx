

import * as React from "react"
import { useParams } from "@tanstack/react-router"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar1Icon,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  MessageCircle,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMenu } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { WorkspaceSwitcher } from "@/components/workspace-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { workspace_id } = useParams({ strict: false })

  const data = {


    navMenu: [
      {
        name: "Home",
        url: `/workspaces/${workspace_id}/dashboard`,
        icon: Home,
      },
      {
        name: "Message",
        url: `/workspaces/${workspace_id}/messages`,
        icon: MessageCircle,
      },
      {
        name: "Calendar",
        url: `/workspaces/${workspace_id}/calender`,
        icon: Calendar1Icon,
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
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.navMenu} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
