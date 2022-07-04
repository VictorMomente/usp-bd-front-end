import AppProvider from '@hooks/index'
import ConsultDrivers from '@pages/ConsultDrivers'
import type { NextPage } from 'next'
import GlobalStyle from '../../global'

const ConsDrivers: NextPage = () => {
  return (
    <>
      <AppProvider>
        <ConsultDrivers></ConsultDrivers>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default ConsDrivers
