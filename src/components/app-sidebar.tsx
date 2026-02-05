import * as React from "react"
import { useParams } from "@tanstack/react-router"

import {
  Calendar1Icon,
  Home,
  MessageCircle,
} from "lucide-react"

import { SidebarItemsSkeleton } from "./common/sidebar-items-skeleton"
import { Spinner } from "./ui/spinner"
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



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { workspace_id } = useParams({ strict: false })



  const data = {


    navMenu: [
      {
        name: "Home",
        url: `/${workspace_id}/dashboard`,
        icon: Home,
      },
      {
        name: "Message",
        url: `/${workspace_id}/messages`,
        icon: MessageCircle,
      },
      {
        name: "Calendar",
        url: `/${workspace_id}/calender`,
        icon: Calendar1Icon,
      },
    ],

  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspace_id={workspace_id} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.navMenu} />
        <React.Suspense fallback={<SidebarItemsSkeleton title="PROJECTS" />}>
          <NavProjects />
        </React.Suspense>

      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
