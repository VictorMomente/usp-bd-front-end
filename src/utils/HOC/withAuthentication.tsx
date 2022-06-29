import { AuthProvider } from '@hooks/auth'
import router from 'next/router'
import { useEffect, useState } from 'react'
import SignIn from '../../components/pages/Signin'
import GlobalStyle from '../../global'
import { parseCookies } from 'nookies'

const withAuthentication = (Component: JSX.Element): JSX.Element | null => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    setLoading(true)

    try {
      const login = JSON.parse(parseCookies(null)['db@login'])

      const user = login.Status
      setUser(user)
    } catch (e) {}

    setLoading(false)
  }

  if (loading) return null
  if (!user) {
    router.push('/signin')
    return (
      <>
        <AuthProvider>
          <SignIn></SignIn>
        </AuthProvider>
        <GlobalStyle />
      </>
    )
  } else return Component
}

export default withAuthentication
