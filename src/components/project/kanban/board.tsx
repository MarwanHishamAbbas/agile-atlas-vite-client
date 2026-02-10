import { Ellipsis, Plus } from 'lucide-react'
import BoardTask from './board-task'
import type { FC } from 'react'
import { Card, CardHeader, CardPanel, CardTitle } from '@/components/ui/card'

type BoardProps = {

}

const Board: FC<BoardProps> = () => {
    return <main className='flex items-start overflow-x-scroll 2xl:[&::-webkit-scrollbar]:hidden  gap-4'>
        <Card className='bg-neutral-50 shrink-0 min-w-87.5'>
            <CardHeader className='flex items-center justify-between'>
                <CardTitle>To Do</CardTitle>
                <div className='flex items-center gap-2'>
                    <Plus className='size-4 stroke-neutral-500' />
                    <Ellipsis className='size-4 stroke-neutral-500' />
                </div>
            </CardHeader>
            <CardPanel className='space-y-1.5'>
                <BoardTask />
                <BoardTask />
                <BoardTask />

            </CardPanel>
        </Card>
        <Card className='bg-neutral-50 shrink-0 min-w-87.5'>
            <CardHeader className='flex items-center justify-between'>
                <CardTitle>On Progress</CardTitle>
                <div className='flex items-center gap-2'>
                    <Plus className='size-4 stroke-neutral-500' />
                    <Ellipsis className='size-4 stroke-neutral-500' />
                </div>
            </CardHeader>
            <CardPanel className='space-y-1.5'>
                <BoardTask />
                <BoardTask />
                <BoardTask />

            </CardPanel>
        </Card>
        <Card className='bg-neutral-50 shrink-0 min-w-87.5'>
            <CardHeader className='flex items-center justify-between'>
                <CardTitle>Review</CardTitle>
                <div className='flex items-center gap-2'>
                    <Plus className='size-4 stroke-neutral-500' />
                    <Ellipsis className='size-4 stroke-neutral-500' />
                </div>
            </CardHeader>
            <CardPanel className='space-y-1.5'>
                <BoardTask />
                <BoardTask />
                <BoardTask />

            </CardPanel>
        </Card>
        <Card className='bg-neutral-50 shrink-0 min-w-87.5'>
            <CardHeader className='flex items-center justify-between'>
                <CardTitle>Done</CardTitle>
                <div className='flex items-center gap-2'>
                    <Plus className='size-4 stroke-neutral-500' />
                    <Ellipsis className='size-4 stroke-neutral-500' />
                </div>
            </CardHeader>
            <CardPanel className='space-y-1.5'>
                <BoardTask />
                <BoardTask />
                <BoardTask />

            </CardPanel>
        </Card>
    </main>
}

export default Board