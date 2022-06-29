import React from 'react'

import { AuthProvider } from './auth'
import { ToastProvider } from './toast'

type AppProviderProps = {
  children: React.ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)

export default AppProvider