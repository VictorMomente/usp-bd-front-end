import ReportContent from '@components/tables/report-table'
import { useAuth } from '@hooks/auth'
import { getSpecificReport } from '@services/api/routes/get-specific-report'
import router, { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Container, Content } from './styles'

const SpecificReportContent: React.FC = () => {
  const [reportHeader, setReportHeader] = useState([] as any)
  const [report, setReport] = useState()

  const { user } = useAuth()

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const fetchReport = async () => {
    try {
      console.log('ear')

      const response = await getSpecificReport(
        user.Tipo,
        reportHeader.report,
        user.IdOriginal
      )
      setReport(response)
    } catch (e) {}
  }

  useEffect(() => {
    fetchReport()
  }, [user])

  const routerManager = useRouter()

  useEffect(() => {
    if (!routerManager.isReady) return
    const query = router.query
    if (query && query.report) setReportHeader(query)
  }, [])

  const functionTest = useCallback(async (): Promise<void> => {
    console.log(`report `, report)
  }, [])

  return (
    <>
      <Container>
        <h1>{reportHeader.title}</h1>
        <h3>• {reportHeader.subtitle} •</h3>
        <a onClick={() => router.push('reports')}>Voltar</a>
      </Container>
      {functionTest}
      <Content>
        {(report && <ReportContent json={report}></ReportContent>) || (
          <p>Não há dados para esse relatório 🙁</p>
        )}
      </Content>
    </>
  )
}

export default SpecificReportContent
