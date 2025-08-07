import * as React from "react"

type ToastType = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  action?: React.ReactNode
}

type ToastContextType = {
  toasts: ToastType[]
  toast: (toast: Omit<ToastType, "id">) => void
  remove: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastType[]>([])

  const toast = (toast: Omit<ToastType, "id">) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, ...toast }])
    setTimeout(() => remove(id), 5000) // Auto dismiss after 5s
  }

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, remove }}>
      {children}
    </ToastContext.Provider>
  )
}
