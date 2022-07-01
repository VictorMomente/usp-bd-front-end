import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

type AuthState = {
  user: object
}

type Credentials = {
  login: string
  password: string
}

interface AuthContextData {
  user: any
  challengeName?: string
  signIn(crendtials: Credentials): Promise<any>
  signOut(): Promise<void>
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
      const login = JSON.parse(parseCookies(null)['db@login'])

      if (login.Status) {
        userData = { user: login }
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
    async ({ login, password }: Credentials): Promise<any> => {
      console.log('• [context] - signIn')
      let response
      try {
        response = await axios({
          method: 'post',
          url: 'http://localhost:3001/signin',
          data: {
            login,
            password
          }
        })
      } catch (err) {
        throw new Error('NotAuthorizedException')
      }

      const user = response.data.user
      setAuthData({ user })
      setCookie(null, 'db@login', JSON.stringify(user), {
        maxAge: 2600,
        path: '/'
      })
      return user
    },
    []
  )

  const signOut = useCallback(async (): Promise<void> => {
    console.log('• [context] - signOut')
    destroyCookie(null, 'db@login')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: authData.user,
        signIn,
        signOut
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
