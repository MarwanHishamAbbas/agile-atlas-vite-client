

import * as React from "react"
import { useNavigate, useParams } from "@tanstack/react-router"
import { BookMarked, ChevronsUpDown, Plus } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { buttonVariants } from "./ui/button"
import CreateWorkspaceForm from "./workspace/create-workspace-form"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { userWorkspacesQueryOptions } from "@/hooks/use-workspace"
import { cn } from "@/lib/utils"


export function WorkspaceSwitcher() {
  const { isMobile, state, setOpenMobile } = useSidebar()
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = React.useState<boolean>(false)

  const { data: workspaces } = useSuspenseQuery(userWorkspacesQueryOptions).data


  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const activeWorkspace = workspaces.find((workspace) => workspace.id === params.workspace_id)



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

                <BookMarked className={cn("size-3.5 shrink-0", `fill-[${activeWorkspace?.color}]`)} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeWorkspace?.name}</span>
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
                onClick={() => navigate({ to: "/workspaces/$workspace_id/dashboard", params: { workspace_id: workspace.id } }).then(() => setOpenMobile(false))}
                disabled={workspace.id === activeWorkspace?.id}
                className={cn("gap-2 p-2 text-neutral-500 font-medium ", workspace.id === activeWorkspace?.id ? "cursor-not-allowed pointer-events-none" : "")}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <BookMarked className={cn("size-3.5 shrink-0", `fill-[${workspace.color}]`)} />
                </div>
                {workspace.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2 p-2 ">
              <Dialog open={createWorkspaceOpen} onOpenChange={setCreateWorkspaceOpen}>
                <DialogTrigger className={buttonVariants({ className: 'w-full justify-start', variant: "ghost" })}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus className="size-4" />
                  </div>
                  <div className="text-muted-foreground font-medium">Add workspace</div>
                </DialogTrigger>
                <DialogContent>
                  <CreateWorkspaceForm setCreateWorkspaceOpen={setCreateWorkspaceOpen} />
                </DialogContent>
              </Dialog>

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
