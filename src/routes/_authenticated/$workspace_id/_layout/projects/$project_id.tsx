import { createFileRoute } from '@tanstack/react-router'
import { CalendarRange, ChartGantt, Filter, LayoutPanelLeft, List, PenLine, Plus, Share } from 'lucide-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import Board from '@/components/project/kanban/board'
import { getProjectQueryOptions } from '@/hooks/use-project'
import ProjectTitleForm from '@/components/project/project-title-form'

export const Route = createFileRoute(
  '/_authenticated/$workspace_id/_layout/projects/$project_id',
)({
  async loader(ctx) {
    const { queryClient } = ctx.context
    const { project_id, workspace_id } = ctx.params
    await queryClient.ensureQueryData(getProjectQueryOptions(workspace_id, project_id))



  },
  component: RouteComponent,
})

function RouteComponent() {
  const { project_id, workspace_id } = Route.useParams()
  const { data } = useSuspenseQuery(
    getProjectQueryOptions(workspace_id, project_id)
  )


  return (
    <div className='space-y-6'>
      <ProjectTitleForm name={data.data.name} />
      <Tabs defaultValue="board">
        <div className='flex items-center justify-between max-xl:flex-col'>
          <TabsList>
            <TabsTab value="board"><LayoutPanelLeft />Board</TabsTab>
            <TabsTab value="list"><List />List</TabsTab>
            <TabsTab value="calendar"><CalendarRange />Calendar</TabsTab>
            <TabsTab value="timeline"><ChartGantt />Timeline</TabsTab>
          </TabsList>
          <div className='flex items-center gap-2 '>
            <Input placeholder='Search' className='min-w-96 max-lg:max-w-32 h-8 rounded-lg' />
            <Button variant={"outline"} >
              <Filter />
              Filter
            </Button>
            <Button>
              <Plus />
              New Task
            </Button>
          </div>
        </div>
        <div className='mt-5'>
          <TabsPanel value="board"><Board /></TabsPanel>
          <TabsPanel value="list"><List />List</TabsPanel>
          <TabsPanel value="calendar"><CalendarRange />Calendar</TabsPanel>
          <TabsPanel value="timeline"><ChartGantt />Timeline</TabsPanel>
        </div>
      </Tabs>
    </div>
  )
}
