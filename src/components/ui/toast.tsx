"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cn } from "@/lib/utils"

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(
      "bg-white dark:bg-zinc-900 border shadow-lg rounded-md p-4",
      className,
    )}
    {...props}
  />
))
Toast.displayName = ToastPrimitives.Root.displayName

export { Toast }
