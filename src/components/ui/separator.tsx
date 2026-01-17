import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}


function FieldSeparator({ label }: { label: string }) {
  return (
    <div className="w-full max-w-sm">
      <div className="relative flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="shrink-0 px-2 label-sm text-neutral-400">
          {label}
        </span>
        <Separator className="flex-1" />
      </div>
    </div>
  )
}

export { Separator, FieldSeparator }
