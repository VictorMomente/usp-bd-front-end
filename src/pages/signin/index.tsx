import AppProvider from '@hooks/index'
import type { NextPage } from 'next'
import SignIn from '../../components/pages/Signin'
import GlobalStyle from '../../global'

const SignInPage: NextPage = () => {
  return (
    <>
      <AppProvider>
        <SignIn></SignIn>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default SignInPage
