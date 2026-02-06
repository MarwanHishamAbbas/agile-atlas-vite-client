import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  Folder,
  Plus,

} from "lucide-react"
import { Link, useParams } from "@tanstack/react-router";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";


import CreateProjectFrom from "./project/create-project-form";
import { buttonVariants } from "./ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,

  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";
import { workspaceProjectsQueryOptions } from "@/hooks/use-project";



export function NavProjects() {


  const { workspace_id, project_id } = useParams({ strict: false })
  const [createProjectOpen, setCreateProjectOpen] = React.useState<boolean>(false)
  const { data: projects } = useSuspenseQuery(workspaceProjectsQueryOptions(workspace_id as string))




  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center justify-between">PROJECTS
        <Dialog open={createProjectOpen} onOpenChange={setCreateProjectOpen}>
          <DialogTrigger className="cursor-pointer">
            <Plus className="size-4" />
          </DialogTrigger>

          <DialogContent>
            <DialogTitle className="label-lg flex items-center gap-2 "><Folder className="size-5 stroke-primary" />Add Project</DialogTitle>
            <CreateProjectFrom setCreateProjectOpen={setCreateProjectOpen} />
          </DialogContent>
        </Dialog>

      </SidebarGroupLabel>

      <SidebarMenu>
        {projects.data.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link activeProps={{ className: 'bg-white text-neutral-900' }} className={buttonVariants({ variant: "ghost", className: "justify-start font-normal" })} to={'/$workspace_id/projects/$project_id'} params={{ project_id: item.id, workspace_id: workspace_id as string }}>
                <Folder className={cn(`${item.id}` === project_id ? 'stroke-primary' : 'stroke-neutral-400')} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>


    </SidebarGroup>

  )
}
