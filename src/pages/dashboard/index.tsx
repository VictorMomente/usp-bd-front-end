import type { NextPage } from 'next'
import withAuthentication from '../../utils/HOC/withAuthentication'
import GlobalStyle from '../../global'
import AppProvider from '@hooks/index'

import DashboardContent from '@pages/Dashboard'

const Dashboard: NextPage = () => {
  return withAuthentication(
    <>
      <AppProvider>
        <DashboardContent></DashboardContent>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default Dashboard
