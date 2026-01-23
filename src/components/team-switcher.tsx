

import * as React from "react"
import { BookMarked, ChevronsUpDown, Plus } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { userWorkspacesQueryOptions } from "@/hooks/use-workspace-hook"
import { cn } from "@/lib/utils"

export function WorkspaceSwitcher() {
  const { isMobile, state } = useSidebar()

  const { data: workspaces } = useSuspenseQuery(userWorkspacesQueryOptions).data
  const [activeWorkspace, setActiveTeam] = React.useState(workspaces[0])

  // const {getWorkspace} = useWorkspace()
  console.log(activeWorkspace.color)
  const handleWorkspaceChange = async () => {

  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {state === "expanded" && (
            <>
              <div className="flex items-center gap-1 mb-4">
                <img src="/logo.svg" alt="" className="size-10" />
                <p className="p-lg font-medium data-[state=open]:text-destructive">AgileAtlas</p>
              </div>

              <p className="p-xs uppercase text-neutral-400 mb-1 font-medium">Workspace</p>
            </>
          )}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-white hover:bg-white/80 cursor-pointer transition-all"
            >
              <div className="flex size-6 items-center justify-center rounded-md border">

                <BookMarked className={cn("size-3.5 shrink-0", `fill-[${activeWorkspace.color}]`)} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeWorkspace.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.name}
                // onClick={() => setActiveTeam(workspace)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <BookMarked className={cn("size-3.5 shrink-0", `fill-[${workspace.color}]`)} />
                </div>
                {workspace.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add workspace</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
