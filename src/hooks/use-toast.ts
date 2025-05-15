
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/use-toast";
import type { ToastProps as ToastPropsOriginal } from "@/components/ui/use-toast";

// Re-export without additional properties that were causing type errors
export type ToastProps = ToastPropsOriginal;

// Re-export to avoid circular dependency
export const useToast = useToastOriginal;
export const toast = toastOriginal;
