import AppProvider from '@hooks/index'
import SpecificReportContent from '@pages/SpecificReport'
import type { NextPage } from 'next'
import GlobalStyle from '../../global'

const SpecificReport: NextPage = () => {
  return (
    <>
      <AppProvider>
        <SpecificReportContent></SpecificReportContent>
      </AppProvider>
      <GlobalStyle />
    </>
  )
}

export default SpecificReport
