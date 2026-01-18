import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === "password"

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const inputType = isPassword && showPassword ? "text" : type

  if (isPassword) {
    return (
      <div className="relative">
        <input
          type={inputType}
          autoComplete="current-password"
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-netural-400 selection:bg-primary placeholder:text-sm selection:text-primary-foreground border-input h-10 w-full min-w-0 rounded-md border px-3 py-1 pr-10 text-base  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
            "aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-1  top-0.5 flex items-center justify-center text-muted-foreground"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
    )
  }

  return (
    <input
      type={inputType}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-netural-400 selection:bg-primary placeholder:text-sm selection:text-primary-foreground  border-input h-10 w-full min-w-0 rounded-md border px-3 py-1 text-base  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }