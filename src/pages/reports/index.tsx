import type { NextPage } from 'next'
import withAuthentication from '../../utils/HOC/withAuthentication'
import GlobalStyle from '../../global'
import AppProvider from '@hooks/index'

import ReportsContent from '@pages/Reports'

const Report: NextPage = () => {
  return withAuthentication(
    <>
      <AppProvider>
        <ReportsContent></ReportsContent>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default Report
