import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import Auth from '@aws-amplify/auth'
import { setCookie, parseCookies } from 'nookies'

type AuthState = {
  token: string
  user: object
}

type Credentials = {
  email: string
  password: string
}

type ForgotCredentials = {
  codeConfirm: string
  password: string
}
interface AuthContextData {
  user: any
  token?: string
  challengeName?: string
  signIn(crendtials: Credentials): Promise<any>
  signOut(): Promise<void>
  forgot(email: string): Promise<void>
  forgotConfirmNewPassowrd(forgotCredentials: ForgotCredentials): Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>({} as AuthState)

  const getUserAuthenticated = useCallback(async () => {
    let userData
    try {
      const response = await Auth.currentAuthenticatedUser()
      if (response) {
        userData = {
          user: response.attributes,
          token: response.signInUserSession.idToken.jwtToken
        }
        setAuthData(userData)
      }
    } catch (err) {
      console.log('• [context] User is not authenticated')
      userData = {}
    }
    return userData
  }, [])

  useEffect(() => {
    getUserAuthenticated()
  }, [getUserAuthenticated])

  const signIn = useCallback(
    async ({ email, password }: Credentials): Promise<any> => {
      console.log('• [context] - signIn')
      const response = await Auth.signIn(email, password)
      if (response?.challengeName === 'NEW_PASSWORD_REQUIRED')
        return { challengeName: 'NEW_PASSWORD_REQUIRED' }
      const user = response.attributes
      const token = response.signInUserSession.idToken.jwtToken
      setAuthData({ token, user })
      return user
    },
    []
  )

  const signOut = useCallback(async (): Promise<void> => {
    console.log('• [context] - signOut')
    await Auth.signOut()
  }, [])

  const forgot = useCallback(async (email: string): Promise<void> => {
    await Auth.forgotPassword(email)
    setCookie(null, 'usp-bd-front-end@forgot-email', email, {
      maxAge: 2600,
      path: '/'
    })
  }, [])

  const forgotConfirmNewPassowrd = useCallback(
    async (forgotCredentials: ForgotCredentials): Promise<void> => {
      const props = parseCookies(null)
      const email = props['usp-bd-front-end@forgot-email']
      await Auth.forgotPasswordSubmit(
        email,
        forgotCredentials.codeConfirm,
        forgotCredentials.password
      )
    },
    []
  )

  return (
    <AuthContext.Provider
      value={{
        user: authData.user,
        token: authData?.token,
        signIn,
        signOut,
        forgot,
        forgotConfirmNewPassowrd
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}
