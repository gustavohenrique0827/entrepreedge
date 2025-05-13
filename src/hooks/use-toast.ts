
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

import {
  useToast as useHookToast,
} from "@/components/ui/use-toast"

type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastActionElement>

export type ToastVariant = "default" | "destructive" | "success" | "info" | "warning"

export type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionProps
  variant?: ToastVariant
}

export const useToast = useHookToast

export type { Toast }
