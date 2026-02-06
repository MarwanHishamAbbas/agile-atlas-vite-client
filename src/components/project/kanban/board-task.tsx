import { Flag } from 'lucide-react'
import type { FC } from 'react';
import { Card, CardHeader, CardPanel } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


type BoardTaskProps = {

}

const BoardTask: FC<BoardTaskProps> = () => {
    return <Card className='bg-white rounded-xl'>
        <CardHeader className='w-fit'>
            <Badge variant="destructive" size={'lg'} >
                <Flag aria-hidden="true" />
                <span className='label-xs'>
                    High
                </span>
            </Badge>
        </CardHeader>
        <CardPanel>
            <p className='label-lg'>Define project scope and objectives</p>
        </CardPanel>
    </Card>
}

export default BoardTask