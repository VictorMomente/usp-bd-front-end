import ReportContent from '@components/tables/report-table'
import { useAuth } from '@hooks/auth'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Content } from './styles'

const data = [
  {
    id: 1,
    driver: 'Felipe Massa',
    'data de nascimento': '1988'
  },
  {
    id: 2,
    driver: 'Victor Momente',
    'data de nascimento': '1927'
  }
]

const SpecificReportContent: React.FC = () => {
  const [report, setReport] = useState([] as any)

  const { user } = useAuth()

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const routerManager = useRouter()

  useEffect(() => {
    if (!routerManager.isReady) return
    const query = router.query
    if (query && query.report) setReport(query)
  }, [router.isReady, router.query])

  return (
    <>
      <Container>
        <h1>{report.title}</h1>
        <h3>• {report.subtitle} •</h3>
        <a onClick={() => router.push('reports')}>Voltar</a>
      </Container>
      <Content>
        <ReportContent json={data}></ReportContent>
      </Content>
    </>
  )
}

export default SpecificReportContent
