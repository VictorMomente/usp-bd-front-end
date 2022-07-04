import Button from '@components/buttons/Button'
import OverviewContent from '@components/tables/overview'
import { useAuth } from '@hooks/auth'
import { getOverview } from '@services/api/routes/get-overview'
import { Overview } from '@services/api/routes/typeOverview'
import router from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Container, Content } from './styles'

const DashboardContent: React.FC = () => {
  const { user, signOut } = useAuth()

  const [overview, setOverview] = useState({} as Overview)
  const [loadingButton, setLoadingButton] = useState(false)

  const fetchOverview = async () => {
    try {
      let overview
      if (user.Tipo === 'Administrador') overview = await getOverview(user.Tipo)
      else overview = await getOverview(user.Tipo, user.IdOriginal)
      setOverview(overview)
    } catch (e) {}
  }

  useEffect(() => {
    fetchOverview()
  }, [user])

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const handleRegisterConstructors = useCallback(async (): Promise<void> => {
    router.push('/regconstructors')
  }, [])

  const handleRegisterDrivers = useCallback(async (): Promise<void> => {
    router.push('/regdrivers')
  }, [])

  const handleConsultDrivers = useCallback(async (): Promise<void> => {
    router.push('/consdrivers')
  }, [])

  const handleReport = useCallback(async (): Promise<void> => {
    console.log('vai pra tela de relatorio')
    // router.push('/signin')
  }, [])

  const handleSigntOut = useCallback(async (): Promise<void> => {
    setLoadingButton(true)
    await signOut()
    router.push('/signin')
  }, [])

  return (
    <Container>
      <Content>
        <h1>Overview</h1>
        <p>
          • {user?.Tipo}
          {user?.Tipo !== 'Administrador' && `: ${user?.Name}`} •
        </p>
        <OverviewContent>{overview}</OverviewContent>
        {user && user.Tipo === 'Administrador' && (
          <Button type="submit" onClick={handleRegisterConstructors}>
            Cadastrar Escuderias
          </Button>
        )}
        {user && user.Tipo === 'Administrador' && (
          <Button type="submit" onClick={handleRegisterDrivers}>
            Cadastrar Pilotos
          </Button>
        )}
        {user && user.Tipo === 'Escuderia' && (
          <Button type="submit" onClick={handleConsultDrivers}>
            Consultar Pilotos
          </Button>
        )}
        <Button type="submit" onClick={handleReport}>
          Relatórios
        </Button>
        <Button type="submit" onClick={handleSigntOut} loading={loadingButton}>
          Sair
        </Button>
      </Content>
    </Container>
  )
}

export default DashboardContent
