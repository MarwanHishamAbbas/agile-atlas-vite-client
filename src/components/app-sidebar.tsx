

import * as React from "react"
import { useParams } from "@tanstack/react-router"

import {
  Calendar1Icon,
  Home,
  MessageCircle,
} from "lucide-react"

import { useSuspenseQuery } from "@tanstack/react-query"
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
import { workspaceProjectsQueryOptions } from "@/hooks/use-project"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { workspace_id } = useParams({ strict: false })


  const { data: projects } = useSuspenseQuery(workspaceProjectsQueryOptions(workspace_id as string))

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
    projects: projects.data.map((project) => ({
      name: project.name,
      url: `/${workspace_id}/projects/${project.id}`
    }))
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher workspace_id={workspace_id} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={data.navMenu} />
        <React.Suspense fallback={<Spinner />}>
          <NavProjects projects={data.projects} />
        </React.Suspense>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
