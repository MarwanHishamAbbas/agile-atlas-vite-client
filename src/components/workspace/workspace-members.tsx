import { useSuspenseQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { workspaceMembersQueryOptions } from '@/hooks/use-workspace';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarStack } from '@/components/common/avatar-stack'

type WorkspaceMembersWidgetProps = {
    params: string
}

const WorkspaceMembersWidget: FC<WorkspaceMembersWidgetProps> = ({ params }) => {
    const { data } = useSuspenseQuery(workspaceMembersQueryOptions(params))

    const { data: members } = data

    return (
        <AvatarStack>
            {members.slice(0, 4).map((member) => (
                <Avatar key={member.email}>
                    {/* <AvatarImage src={'https://images.unsplash.com/photo-1606122017369-d782bbb78f32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXRzfGVufDB8fDB8fHww'} /> */}
                    <AvatarFallback>{member.name
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}</AvatarFallback>
                </Avatar>
            ))}

        </AvatarStack>
    )
}

export default WorkspaceMembersWidget