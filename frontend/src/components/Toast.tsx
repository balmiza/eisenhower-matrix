import React, { useEffect } from 'react'

export type ToastType = 'success' | 'error'

export interface ToastMessage {
  id: number
  message: string
  type: ToastType
}

interface ToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: number) => void
}

const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: number) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <div className={`toast toast--${toast.type}`} onClick={() => onDismiss(toast.id)}>
      <span>{toast.type === 'success' ? '✓' : '✕'}</span>
      <p>{toast.message}</p>
    </div>
  )
}

export default Toast
