import Button from '@components/buttons/Button'
import { useAuth } from '@hooks/auth'
import router from 'next/router'
import { useCallback, useState } from 'react'
import { Container, Content } from './styles'

const DashboardContent: React.FC = () => {
  const { user, signOut } = useAuth()

  const [loadingButton, setLoadingButton] = useState(false)

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const handleClick = useCallback(async (): Promise<void> => {
    setLoadingButton(true)
    await signOut()
    router.push('/signin')
  }, [])

  return (
    <Container>
      <Content>
        <h1>Menu</h1>
        <h4></h4>
        <Button type="submit" onClick={handleClick}>
          Overview
        </Button>
        <Button type="submit" onClick={handleClick}>
          Relatórios
        </Button>
        <Button type="submit" onClick={handleClick} loading={loadingButton}>
          Sair
        </Button>
      </Content>
    </Container>
  )
}

export default DashboardContent
