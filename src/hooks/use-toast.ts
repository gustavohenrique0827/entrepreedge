
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"

type ToastVariant = 'default' | 'destructive' | 'success';

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = Toast & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: ToastVariant
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toasts: ToasterToast[] = []

type ToasterToastOptions = Omit<ToasterToast, "id">

function toast(options: ToasterToastOptions) {
  const id = genId()

  const toast: ToasterToast = {
    id,
    ...options,
    open: true,
    onOpenChange: open => {
      if (!open) {
        // Remove toast from DOM after it's been closed
        setTimeout(() => {
          toasts.splice(toasts.indexOf(toast), 1)
        }, TOAST_REMOVE_DELAY)
      }
    },
  }

  toasts.push(toast)
  return toast
}

function useToast() {
  return {
    toast,
    toasts,
    dismiss: (toastId: string) => {
      const toast = toasts.find(toast => toast.id === toastId)
      if (toast) {
        toast.open = false
      }
    },
  }
}

export { toast, useToast }
