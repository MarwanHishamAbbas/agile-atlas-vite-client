import { createFileRoute } from '@tanstack/react-router'
import { Filter, PenLine, Plus, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
      <div className='flex items-center justify-between'>
        <div>

        </div>
        <div className='flex items-center gap-2 '>
          <Input placeholder='Search' className='flex-1 min-w-96 h-8 rounded-lg' />
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
    </div>
  )
}
