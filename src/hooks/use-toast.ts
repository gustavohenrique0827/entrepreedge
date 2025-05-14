
import { useToast as useToastOriginal, toast as toastOriginal, ToastProps } from "@/components/ui/use-toast"

// Re-export to avoid circular dependency
export const useToast = useToastOriginal;
export const toast = toastOriginal;
export type { ToastProps };
