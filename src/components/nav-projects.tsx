import React, { Suspense } from "react";

import {
  Folder,
  Plus,

} from "lucide-react"
import { Link, useLocation } from "@tanstack/react-router";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { buttonVariants } from "./ui/button";

import CreateProjectFrom from "./project/create-project-form";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,

  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";



export function NavProjects({
  projects,
}: {
  projects: Array<{
    name: string
    url: string
  }>
}) {

  const { pathname } = useLocation()
  const [createProjectOpen, setCreateProjectOpen] = React.useState<boolean>(false)


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
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link activeProps={{ className: 'bg-white text-neutral-900' }} to={item.url}>
                <Folder className={cn(`${item.url}` === pathname ? 'stroke-primary' : 'stroke-neutral-400')} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          // /4ec5fd4f-3cf4-4cc3-a6fd-b577d5d60937/projects//uuid
        ))}
      </SidebarMenu>


    </SidebarGroup>
    // <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    //   <div className="flex items-center justify-between">

    //     <SidebarGroupLabel>PROJECTS</SidebarGroupLabel>
    //     <Plus className="size-4 text-neutral-400" />
    //   </div>
    //   <SidebarMenu>
    //     {projects.map((item) => (
    //       <SidebarMenuItem key={item.name}>
    //         <SidebarMenuButton asChild>
    //           <a href={item.url}>
    //             <item.icon />
    //             <span>{item.name}</span>
    //           </a>
    //         </SidebarMenuButton>
    //         {/* <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <SidebarMenuAction showOnHover>
    //               <MoreHorizontal />
    //               <span className="sr-only">More</span>
    //             </SidebarMenuAction>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent
    //             className="w-48 rounded-lg"
    //             side={isMobile ? "bottom" : "right"}
    //             align={isMobile ? "end" : "start"}
    //           >
    //             <DropdownMenuItem>
    //               <Folder className="text-muted-foreground" />
    //               <span>View Project</span>
    //             </DropdownMenuItem>
    //             <DropdownMenuItem>
    //               <Forward className="text-muted-foreground" />
    //               <span>Share Project</span>
    //             </DropdownMenuItem>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem>
    //               <Trash2 className="text-muted-foreground" />
    //               <span>Delete Project</span>
    //             </DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu> */}
    //       </SidebarMenuItem>
    //     ))}
    //     <SidebarMenuItem>
    //       <SidebarMenuButton className="text-sidebar-foreground/70">
    //         <MoreHorizontal className="text-sidebar-foreground/70" />
    //         <span>More</span>
    //       </SidebarMenuButton>
    //     </SidebarMenuItem>
    //   </SidebarMenu>
    // </SidebarGroup>
  )
}
