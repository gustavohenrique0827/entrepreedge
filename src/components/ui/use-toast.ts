
import * as React from "react"
import type { ToastActionElement, ToastProps } from "./toast"

// Updated to a more reasonable default timeout (5 seconds instead of over 16 minutes)
const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000 // Changed from 1000000 (16+ minutes) to 5 seconds

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  open: boolean
  duration?: number
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: Omit<ToasterToast, "id" | "open">
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast> & { id: string }
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: string
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: string
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Add automatic toast dismissal based on duration
const addToDismissQueue = (toastId: string, duration?: number) => {
  if (toastTimeouts.has(`dismiss-${toastId}`)) {
    return
  }

  // Use toast-specific duration or default to 5 seconds
  const actualDuration = duration || 5000;
  
  const timeout = setTimeout(() => {
    toastTimeouts.delete(`dismiss-${toastId}`);
    dispatch({
      type: actionTypes.DISMISS_TOAST,
      toastId,
    });
  }, actualDuration);

  toastTimeouts.set(`dismiss-${toastId}`, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      const newToast = { 
        ...action.toast, 
        id: genId(), 
        open: true 
      };
      
      // Auto-dismiss toast based on duration
      if (newToast.duration !== Infinity) {
        addToDismissQueue(newToast.id, newToast.duration);
      }
      
      return {
        ...state,
        toasts: [
          ...state.toasts,
          newToast,
        ],
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // Clear any existing dismiss timeout
      if (toastId && toastTimeouts.has(`dismiss-${toastId}`)) {
        clearTimeout(toastTimeouts.get(`dismiss-${toastId}`)!);
        toastTimeouts.delete(`dismiss-${toastId}`);
      }

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Clean all timeouts when adding or updating a toast
const clearTimeoutsForToast = (toastId: string) => {
  // Clear dismiss timeout if it exists
  if (toastTimeouts.has(`dismiss-${toastId}`)) {
    clearTimeout(toastTimeouts.get(`dismiss-${toastId}`)!)
    toastTimeouts.delete(`dismiss-${toastId}`)
  }
  
  // Clear remove timeout if it exists
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId)!)
    toastTimeouts.delete(toastId)
  }
}

type Toast = Omit<ToasterToast, "id" | "open">

export function toast({ ...props }: Toast) {
  // Default duration is 5000ms (5 seconds) if not specified
  const actualProps = {
    ...props,
    duration: props.duration ?? 5000,
  }

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: actualProps,
  })
}

toast.update = (id: string, props: Partial<Toast>) => {
  // Reset timers when updating a toast
  clearTimeoutsForToast(id)
  
  dispatch({
    type: actionTypes.UPDATE_TOAST,
    toast: { id, ...props },
  })
  
  // Re-add to dismiss queue if needed
  if (props.duration !== Infinity) {
    addToDismissQueue(id, props.duration);
  }
}

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: actionTypes.DISMISS_TOAST,
    toastId,
  })
}

// Force remove a toast immediately without animation
toast.remove = (toastId?: string) => {
  if (toastId) {
    clearTimeoutsForToast(toastId);
  } else {
    // Clear all timeouts
    toastTimeouts.forEach((_, key) => {
      clearTimeout(toastTimeouts.get(key)!);
    });
    toastTimeouts.clear();
  }
  
  dispatch({
    type: actionTypes.REMOVE_TOAST,
    toastId,
  });
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: toast.dismiss,
    remove: toast.remove, // Expose the remove function
  }
}

export type { ToastActionElement, ToastProps }
