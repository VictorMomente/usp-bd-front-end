import AppProvider from '@hooks/index'
import type { NextPage } from 'next'
import SignIn from '../components/pages/Signin'
import GlobalStyle from '../global'

const Home: NextPage = () => (
  <>
    <AppProvider>
      <SignIn></SignIn>
      <GlobalStyle />
    </AppProvider>
  </>
)

export default Home
