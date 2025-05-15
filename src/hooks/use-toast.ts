
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/use-toast";
import type { ToastProps as ToastPropsOriginal } from "@/components/ui/use-toast";

// Re-export with enhanced types
export interface ToastProps extends ToastPropsOriginal {
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
  open?: boolean;
}

// Re-export to avoid circular dependency
export const useToast = useToastOriginal;
export const toast = toastOriginal;
