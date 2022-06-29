import Button from '@components/buttons/Button'
import { useAuth } from '@hooks/auth'
import router from 'next/router'
import { useCallback, useState } from 'react'
import { Container, Content } from './styles'

const DashboardContent: React.FC = () => {
  const { user, signOut } = useAuth()

  const [loadingButton, setLoadingButton] = useState(false)

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const handleRegisterConstructors = useCallback(async (): Promise<void> => {
    console.log('vai pra tela de cadastrar escuderia')
    // router.push('/signin')
  }, [])

  const handleRegisterPilots = useCallback(async (): Promise<void> => {
    console.log('vai pra tela de cadastrar piloto')
    // router.push('/signin')
  }, [])

  const handleOverview = useCallback(async (): Promise<void> => {
    console.log('vai pra tela de overview')
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
        <h1>Menu</h1>
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
        <Button type="submit" onClick={handleOverview}>
          Overview
        </Button>
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
