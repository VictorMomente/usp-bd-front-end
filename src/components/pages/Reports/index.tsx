import Button from '@components/buttons/Button'
import { useAuth } from '@hooks/auth'
import router from 'next/router'
import { useCallback } from 'react'
import { Container, Content } from './styles'

const ReportsContent: React.FC = () => {
  const { user } = useAuth()

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const handleOne = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportOne',
        title: 'Relatório Administrador',
        subtitle: 'Contagem e Status'
      }
    })
  }, [])

  const handleTwo = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportTwo',
        title: 'Relatório Administrador',
        subtitle: 'Cidades'
      }
    })
  }, [])

  const handleThree = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportThree',
        title: 'Relatório Escuderia',
        subtitle: 'Pilotos'
      }
    })
  }, [])

  const handleFour = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportFour',
        title: 'Relatório Administrador',
        subtitle: 'Contagem e Status'
      }
    })
  }, [])

  const handleFive = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportFive',
        title: 'Relatório Piloto',
        subtitle: 'Vitórias'
      }
    })
  }, [])

  const handleSix = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportSix',
        title: 'Relatório Piloto',
        subtitle: 'Contagem e Status'
      }
    })
  }, [])

  return (
    <Container>
      <Content>
        <h1>Relatórios</h1>
        <h4>Escolha um relatório</h4>
        {user && user.Tipo === 'Administrador' && (
          <Button type="submit" onClick={handleOne}>
            1. Contagem e Status
          </Button>
        )}
        {user && user.Tipo === 'Administrador' && (
          <Button type="submit" onClick={handleTwo}>
            2. Cidades
          </Button>
        )}
        {user && user.Tipo === 'Escuderia' && (
          <Button type="submit" onClick={handleThree}>
            3. Pilotos
          </Button>
        )}
        {user && user.Tipo === 'Escuderia' && (
          <Button type="submit" onClick={handleFour}>
            4. Contagem e Status
          </Button>
        )}
        {user && user.Tipo === 'Piloto' && (
          <Button type="submit" onClick={handleFive}>
            5. Vitórias
          </Button>
        )}
        {user && user.Tipo === 'Piloto' && (
          <Button type="submit" onClick={handleSix}>
            6. Contagem e Status
          </Button>
        )}

        <a onClick={() => router.push('dashboard')}>Voltar</a>
      </Content>
    </Container>
  )
}

export default ReportsContent
