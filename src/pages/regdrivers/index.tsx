import AppProvider from '@hooks/index'
import RegisterDrivers from '@pages/RegisterDrivers'
import type { NextPage } from 'next'
import GlobalStyle from '../../global'

const RegDrivers: NextPage = () => {
  return (
    <>
      <AppProvider>
        <RegisterDrivers></RegisterDrivers>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default RegDrivers
