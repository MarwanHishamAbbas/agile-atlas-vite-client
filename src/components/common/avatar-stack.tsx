import { Children } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AvatarStackProps = {
    children: ReactNode;
    className?: string;
    animate?: boolean;
    size?: number;
};

export const AvatarStack = ({
    children,
    className,

    size = 40,
    ...props
}: AvatarStackProps) => (
    <div
        className={cn(
            "-space-x-3 flex items-center",

            className
        )}
        {...props}
    >
        {Children.map(children, (child, index) => {
            if (!child) {
                return null;
            }

            return (
                <div
                    key={index}
                    className={cn(
                        "size-full shrink-0 overflow-hidden rounded-full",
                        '**:data-[slot="avatar"]:size-full',
                        className
                    )}
                    style={{
                        width: size,
                        height: size,

                    }}
                >
                    {child}
                </div>
            );
        })}
    </div>
);