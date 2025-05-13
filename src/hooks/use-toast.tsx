
import * as React from "react";
import { cn } from "@/lib/utils";

// Define o tipo para os elementos de ação do Toast
export type ToastActionElement = React.ReactElement<{
  className?: string;
  altText: string;
  onClick: () => void;
}>;

// Define os tipos de variantes possíveis para o Toast
export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

// Interface para as propriedades do Toast
export interface ToastProps {
  id?: string;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: ToastVariant;
  duration?: number;
}

// Interface para o contexto do Toast
interface ToastContextValue {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  dismissToast: (id: string) => void;
  updateToast: (id: string, toast: ToastProps) => void;
}

// Cria o contexto para o Toast
const ToastContext = React.createContext<ToastContextValue>({
  toasts: [],
  addToast: () => {},
  dismissToast: () => {},
  updateToast: () => {},
});

// Hook personalizado para utilizar o Toast
export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  // Função para exibir um toast
  const toast = React.useCallback(
    (props: ToastProps) => {
      context.addToast({
        id: crypto.randomUUID(),
        ...props,
      });
    },
    [context]
  );

  // Função para atualizar um toast
  const update = React.useCallback(
    (id: string, props: ToastProps) => {
      context.updateToast(id, props);
    },
    [context]
  );

  // Função para descartar um toast
  const dismiss = React.useCallback(
    (id: string) => {
      context.dismissToast(id);
    },
    [context]
  );

  return {
    toast,
    update,
    dismiss,
    toasts: context.toasts,
  };
};

// Função para exibir um toast (alternativa ao hook)
export const toast = (props: ToastProps) => {
  const { addToast } = React.useContext(ToastContext);
  
  return addToast({
    id: crypto.randomUUID(),
    ...props,
  });
};

// Provider para o Toast
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  // Adiciona um novo toast
  const addToast = React.useCallback((toast: ToastProps) => {
    setToasts((toasts) => [...toasts, toast]);
  }, []);

  // Descarta um toast
  const dismissToast = React.useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, []);

  // Atualiza um toast existente
  const updateToast = React.useCallback((id: string, toast: ToastProps) => {
    setToasts((toasts) =>
      toasts.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  }, []);

  // Valor do contexto com as funções para manipular toasts
  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      dismissToast,
      updateToast,
    }),
    [toasts, addToast, dismissToast, updateToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
