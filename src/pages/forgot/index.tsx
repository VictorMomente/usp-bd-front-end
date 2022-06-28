import AppProvider from '@hooks/index'
import ForgotContent from '@pages/Forgot'
import type { NextPage } from 'next'
import GlobalStyle from '../../global'

const Forgot: NextPage = () => {
  return (
    <>
      <AppProvider>
        <ForgotContent></ForgotContent>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default Forgot
