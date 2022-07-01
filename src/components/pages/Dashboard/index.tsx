import Button from '@components/buttons/Button'
import OverviewContent from '@components/tables/overview'
import { useAuth } from '@hooks/auth'
import { overviewAdmin } from '@services/api/routes/overviewAdmin'
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
      if (user.Tipo === 'Administrador')
        overview = await overviewAdmin(user.Tipo)
      else overview = await overviewAdmin(user.Tipo, user.IdOriginal)
      setOverview(overview)
    } catch (e) {}
  }

  useEffect(() => {
    fetchOverview()
  }, [user])

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const handleRegisterConstructors = useCallback(async (): Promise<void> => {
    console.log('vai pra tela de cadastrar escuderia')
    // router.push('/signin')
  }, [])

  const handleRegisterPilots = useCallback(async (): Promise<void> => {
    console.log('vai pra tela de cadastrar piloto')
    // router.push('/signin')
  }, [])

  const handleConsultPilots = useCallback(async (): Promise<void> => {
    console.log('vai pra tela de consultar pilotos')
    // router.push('/signin')
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
          <Button type="submit" onClick={handleRegisterPilots}>
            Cadastrar Pilotos
          </Button>
        )}
        {user && user.Tipo === 'Escuderia' && (
          <Button type="submit" onClick={handleConsultPilots}>
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
