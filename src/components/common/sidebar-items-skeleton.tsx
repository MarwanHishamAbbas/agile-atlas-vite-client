import type { FC } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

interface SidebarItemsSkeletonProps {
    title: string
    number?: string
}

export const SidebarItemsSkeleton: FC<SidebarItemsSkeletonProps> = ({ title, number = 4 }) => {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="flex items-center justify-between">
                {title}
                <Skeleton className="size-4" />
            </SidebarGroupLabel>

            <SidebarMenu >
                {new Array(number).fill(0).map((i) => (
                    <SidebarMenuItem key={i}>
                        <SidebarMenuButton>
                            <Skeleton className="size-4" />
                            <Skeleton className="h-4 w-24" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}