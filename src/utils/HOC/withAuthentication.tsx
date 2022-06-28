import { AuthProvider } from '@hooks/auth'
import { Auth } from 'aws-amplify'
import router from 'next/router'
import { useEffect, useState } from 'react'
import SignIn from '../../components/pages/Signin'
import GlobalStyle from '../../global'

const withAuthentication = (Component: JSX.Element): JSX.Element | null => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    setLoading(true)

    try {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user)
    } catch (e) {
      console.log(e)
    }

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
