import AppProvider from '@hooks/index'
import ConfirmForgetPasswordContent from '@pages/ForgotNewPassword'
import type { NextPage } from 'next'
import GlobalStyle from '../../global'

const ConfirmForgetPassword: NextPage = () => {
  return (
    <>
      <AppProvider>
        <ConfirmForgetPasswordContent></ConfirmForgetPasswordContent>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default ConfirmForgetPassword
