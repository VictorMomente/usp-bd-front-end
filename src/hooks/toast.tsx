import ToastContainer from '@components/ToastContainer'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 } from 'uuid'

type ToastContextData = {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

export type ToastMessage = {
  id: string
  type?: 'info' | 'success' | 'error'
  title: string
  description?: string
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

type ToastProps = {
  children: React.ReactNode
}

const ToastProvider: React.FC<ToastProps> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = v4()
      const toast = {
        id,
        type,
        title,
        description
      }
      setMessages([...messages, toast])
    },
    [messages]
  )

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
