"use client"

import {
  ToastProvider,
  ToastViewport,
} from "@radix-ui/react-toast"

import { useToast } from "./use-toast"
import { Toast } from "./toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <div className="font-semibold">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
          </Toast>
        )
      })}
      <ToastViewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-96 z-[100]" />
    </ToastProvider>
  )
}