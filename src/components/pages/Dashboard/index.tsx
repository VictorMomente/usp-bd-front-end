import Button from '@components/buttons/Button'
import { useAuth } from '@hooks/auth'
import router from 'next/router'
import { useCallback, useState } from 'react'

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
    <>
      <h1>Dashboard</h1>
      <h2>Olá, {user?.name}</h2>
      <Button type="submit" onClick={handleClick} loading={loadingButton}>
        Sair
      </Button>
    </>
  )
}

export default DashboardContent
