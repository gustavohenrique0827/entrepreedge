
import { useState, useEffect } from 'react';

export type ToastProps = {
  title: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'destructive' | 'success';
  action?: React.ReactNode;
};

export type Toast = ToastProps & {
  id: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, duration = 5000, variant = 'default', action }: ToastProps) => {
    const id = Math.random().toString(36).slice(2, 11);
    const newToast = { id, title, description, duration, variant, action };
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      dismissToast(id);
    }, duration);
    
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toast,
    dismissToast,
    toasts
  };
}

// Export a stand-alone toast function for use without hooks context
export const toast = (props: ToastProps) => {
  const customEvent = new CustomEvent('toast', { detail: props });
  window.dispatchEvent(customEvent);
};

// Global toast handler (optional, for use with the stand-alone toast function)
if (typeof window !== 'undefined') {
  window.addEventListener('toast', (e: any) => {
    const { title, description, duration, variant, action } = e.detail;
    const toastContainer = document.getElementById('toast-container');
    
    if (toastContainer) {
      const toastElement = document.createElement('div');
      toastElement.className = `toast-item ${variant || 'default'}`;
      
      const toastContent = document.createElement('div');
      toastContent.className = 'toast-content';
      
      const titleElement = document.createElement('h4');
      titleElement.textContent = title;
      
      toastContent.appendChild(titleElement);
      
      if (description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;
        toastContent.appendChild(descriptionElement);
      }
      
      toastElement.appendChild(toastContent);
      
      if (action) {
        const actionContainer = document.createElement('div');
        actionContainer.className = 'toast-action';
        actionContainer.innerHTML = typeof action === 'string' ? action : '';
        toastElement.appendChild(actionContainer);
      }
      
      toastContainer.appendChild(toastElement);
      
      setTimeout(() => {
        toastElement.classList.add('hide');
        setTimeout(() => {
          toastContainer.removeChild(toastElement);
        }, 300);
      }, duration || 5000);
    }
  });
}
