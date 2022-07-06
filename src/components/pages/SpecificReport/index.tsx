import Button from '@components/buttons/Button'
import Input from '@components/inputs/Input'
import ReportContent from '@components/tables/report-table'
import { useAuth } from '@hooks/auth'
import { getSpecificReport } from '@services/api/routes/get-specific-report'
import { FormHandles } from '@unform/core'
import router, { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Content } from './styles'
import { Form } from '@unform/web'
import { useToast } from '@hooks/toast'

let city = ''
let userType = ''
let reportType = ''
let userId = 0

const SpecificReportContent: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [reportHeader, setReportHeader] = useState([] as any)
  const [report, setReport] = useState()
  const [loadingButton, setLoadingButton] = useState(false)

  const { addToast } = useToast()

  const { user } = useAuth()

  if (user) {
    console.log(`•Info do usuário: ${JSON.stringify(user)}`)
    userType = user.Tipo
    reportType = reportHeader.report
    userId = user.IdOriginal
  }

  const fetchReport = async () => {
    try {
      if (reportHeader.report !== 'reportTwo') {
        const response = await getSpecificReport(userType, reportType, userId)
        setReport(response)
      }
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

  const handleConsultCity = useCallback(async (): Promise<void> => {
    setLoadingButton(true)
    const response = await getSpecificReport(userType, reportType, userId, city)
    setReport(response)
    setLoadingButton(false)
  }, [])

  const handleSubmit = useCallback(async (): Promise<void> => {
    try {
      if (city === '') {
        addToast({
          type: 'info',
          title: 'Insira uma cidade'
        })
      } else {
        console.log(user)
        handleConsultCity()
      }
    } catch (err: any) {
      setLoadingButton(false)
    }
  }, [addToast])

  const handleChange = async (event: any) => {
    city = event?.target.value
  }

  return (
    <>
      <Container>
        <h1>{reportHeader.title}</h1>
        <p>{reportHeader.subtitle}</p>
        {reportType === 'reportTwo' && (
          <div>
            <Form ref={formRef} onSubmit={handleSubmit} onChange={handleChange}>
              <Input
                name="city"
                placeholder="Pesquise uma cidade"
                autoCapitalize="none"
                maxLength={20}
              ></Input>
              <Button type="submit" loading={loadingButton}>
                Pesquisar
              </Button>
            </Form>
          </div>
        )}
        <a onClick={() => router.push('reports')}>Voltar</a>
      </Container>
      <Content>
        {(report && <ReportContent json={report}></ReportContent>) || (
          <p>Não há dados no momento</p>
        )}
      </Content>
    </>
  )
}

export default SpecificReportContent
