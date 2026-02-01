" "

import {
  Folder,
  Forward,

  MoreHorizontal,
  Plus,
  Trash2
} from "lucide-react"
import { Link, useLocation, useParams } from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
  const { isMobile } = useSidebar()
  const { pathname } = useLocation()


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>PROJECTS</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link activeProps={{ className: 'bg-white text-neutral-900' }} to={item.url + 'uuid'}>
                <Folder className={cn(`${item.url}uuid` === pathname ? 'stroke-primary' : 'stroke-neutral-400')} />
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
