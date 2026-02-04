import { createFileRoute } from '@tanstack/react-router'
import { CalendarRange, ChartGantt, Filter, LayoutPanelLeft, List, PenLine, Plus, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

export const Route = createFileRoute(
  '/_authenticated/_layout/$workspace_id/projects/$project_id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button disabled variant={'secondary'} size={'icon-lg'}>F</Button>
          <h4>Frontend</h4>
          <Button variant={'ghost'} size={"icon-lg"}><PenLine /> </Button>
        </div>
        <Button size={'sm'} variant={'outline'}><Share className='size-3.5' /> Share</Button>
      </div>
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
            <Button variant={"outline"} size={'sm'} >
              <Filter />
              Filter
            </Button>
            <Button size={'sm'}>
              <Plus />
              New Task
            </Button>
          </div>
        </div>
        <div className='mt-20'>
          <TabsPanel value="board"><LayoutPanelLeft />Board</TabsPanel>
          <TabsPanel value="list"><List />List</TabsPanel>
          <TabsPanel value="calendar"><CalendarRange />Calendar</TabsPanel>
          <TabsPanel value="timeline"><ChartGantt />Timeline</TabsPanel>
        </div>
      </Tabs>
    </div>
  )
}
