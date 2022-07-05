import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Container, Content } from './styles'
import router from 'next/router'
import Button from '@components/buttons/Button'
import { useAuth } from '@hooks/auth'
import { useToast } from '@hooks/toast'
import { consultDrivers } from '@services/api/routes/consult-drivers'
import ConsultDriverContent from '@components/tables/consult-driver'
import { getDriversByConstructors } from '@services/api/routes/get-drivers-by-constructors'

let IdOriginal = 0
let piloto = ''

const ConsultDrivers: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user } = useAuth()

  const { addToast } = useToast()

  const [loadingButton, setLoadingButton] = useState(false)
  const [driver, setDriver] = useState(false)
  const [driversByConstructor, setDriversByConstructor] = useState<any[]>([])

  const getDrivers = async () => {
    try {
      setDriversByConstructor(await getDriversByConstructors(user.IdOriginal))
      console.log(driversByConstructor)
    } catch (e) {}
  }

  useEffect(() => {
    getDrivers()
  }, [user])

  if (user) {
    console.log(`•Info do usuário: ${JSON.stringify(user)}`)
    IdOriginal = user.IdOriginal
  }

  const handleConsultDrivers = useCallback(async (): Promise<void> => {
    try {
      const results = await consultDrivers(piloto, IdOriginal)
      if (results === undefined) {
        addToast({
          type: 'error',
          title: 'Piloto não encontrado'
        })
        setDriver(false)
      } else setDriver(results)
    } catch (err) {
      console.log(err)
    }
  }, [user])

  const handleSubmit = useCallback(async (): Promise<void> => {
    try {
      if (piloto === '') {
        addToast({
          type: 'info',
          title: 'Selecione um piloto'
        })
      } else {
        console.log(user)
        handleConsultDrivers()
      }
    } catch (err: any) {
      setLoadingButton(false)
    }
  }, [addToast])

  const handleSelectedChange = async (event: any) => {
    piloto = event?.target.value
  }

  return (
    <Container>
      <Content>
        <h1>Consultar Piloto</h1>
        <h4>Insira o nome do piloto</h4>
        {!!driver && <ConsultDriverContent>{driver}</ConsultDriverContent>}
        <Form ref={formRef} onSubmit={handleSubmit}>
          <select
            defaultValue="pilotos"
            name="nationality"
            id="nationality"
            onChange={handleSelectedChange}
          >
            <option value="pilotos" disabled selected>
              Selecione um piloto
            </option>
            {driversByConstructor &&
              driversByConstructor.map((driver: any) => (
                <option key={driver} value={driver}>
                  {driver}
                </option>
              ))}
          </select>
          <Button type="submit" loading={loadingButton}>
            Consultar
          </Button>
          <a onClick={() => router.push('dashboard')}>Voltar</a>
        </Form>
      </Content>
    </Container>
  )
}

export default ConsultDrivers
