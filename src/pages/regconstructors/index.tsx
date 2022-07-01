import AppProvider from '@hooks/index'
import RegisterConstructors from '@pages/RegisterConstructors'
import type { NextPage } from 'next'
import GlobalStyle from '../../global'

const RegConstructors: NextPage = () => {
  return (
    <>
      <AppProvider>
        <RegisterConstructors></RegisterConstructors>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default RegConstructors
