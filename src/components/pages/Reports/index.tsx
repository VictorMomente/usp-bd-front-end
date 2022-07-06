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
        subtitle: 'Contagem das quantidades de status totais'
      }
    })
  }, [])

  const handleTwo = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportTwo',
        title: 'Relatório Administrador',
        subtitle: 'Aeroportos até 100km da cidade'
      }
    })
  }, [])

  const handleThree = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportThree',
        title: 'Relatório Escuderia',
        subtitle: 'Vitórias dos pilotos da escuderia'
      }
    })
  }, [])

  const handleFour = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportFour',
        title: 'Relatório Administrador',
        subtitle: 'Contagem das quantidades de status da escuderia'
      }
    })
  }, [])

  const handleFive = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportFive',
        title: 'Relatório Piloto',
        subtitle: 'Vitórias por ano por corrida e totais'
      }
    })
  }, [])

  const handleSix = useCallback(async (): Promise<void> => {
    router.push({
      pathname: 'specificreport',
      query: {
        report: 'reportSix',
        title: 'Relatório Piloto',
        subtitle: 'Contagem das quantidades de status do piloto'
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
            1. Status e Contagem
          </Button>
        )}
        {user && user.Tipo === 'Administrador' && (
          <Button type="submit" onClick={handleTwo}>
            2. Cidades e Aeroportos
          </Button>
        )}
        {user && user.Tipo === 'Escuderia' && (
          <Button type="submit" onClick={handleThree}>
            3. Pilotos da escuderia
          </Button>
        )}
        {user && user.Tipo === 'Escuderia' && (
          <Button type="submit" onClick={handleFour}>
            4. Status e Contagem
          </Button>
        )}
        {user && user.Tipo === 'Piloto' && (
          <Button type="submit" onClick={handleFive}>
            5. Minhas vitórias
          </Button>
        )}
        {user && user.Tipo === 'Piloto' && (
          <Button type="submit" onClick={handleSix}>
            6. Status e Contagem
          </Button>
        )}

        <a onClick={() => router.push('dashboard')}>Voltar</a>
      </Content>
    </Container>
  )
}

export default ReportsContent
