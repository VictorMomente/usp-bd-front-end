import React, { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Container, Content } from './styles'
import router from 'next/router'
import getValidationErrors from '@utils/functions/get-validations-errors'
import Button from '@components/buttons/Button'
import Input from '@components/inputs/Input'
import { useAuth } from '@hooks/auth'
import { useToast } from '@hooks/toast'
import { registerDrivers } from '@services/api/routes/register-drivers'

type Register = {
  number: number
  code: string
  forename: string
  surname: string
  date: string
  nationality: string
}

const RegisterDrivers: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user } = useAuth()

  const { addToast } = useToast()

  if (user) console.log(`• Info do usuário: ${JSON.stringify(user)}`)

  const [loadingButton, setLoadingButton] = useState(false)

  const handleRegisterDrivers = useCallback(
    async (data: Register): Promise<void> => {
      await registerDrivers(
        data.number,
        data.code,
        data.forename,
        data.surname,
        data.date,
        data.nationality
      )
    },
    []
  )

  const handleSubmit = useCallback(
    async (data: Register): Promise<void> => {
      data.code = data.code.trim()
      data.forename = data.forename.trim()
      data.surname = data.surname.trim()
      data.date = data.date.trim()
      data.nationality = data.nationality.trim()

      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          number: Yup.number().required('Número obrigatório'),
          code: Yup.string().required('Nome obrigatório'),
          forename: Yup.string().required('Nome obrigatório'),
          surname: Yup.string().required('Sobrenome obrigatório'),
          date: Yup.string().required('Data obrigatório'),
          nationality: Yup.string().required('Nacionalidade obrigatória')
        })
        await schema.validate(data, {
          abortEarly: false
        })

        handleRegisterDrivers(data)
        alert('Piloto cadastrado com sucesso')
        router.push('/dashboard')
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          addToast({
            type: 'info',
            title: 'Não foi possível realizar o login',
            description: 'Preencha os campos corretamente'
          })
        }
        setLoadingButton(false)
      }
    },
    [addToast]
  )

  return (
    <Container>
      <Content>
        <h1>Cadastrar Piloto</h1>
        <h4>Preencha os dados do piloto</h4>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="number"
            placeholder="Número"
            autoCapitalize="none"
            type="number"
          ></Input>
          <Input name="code" placeholder="Código" autoCapitalize="none"></Input>
          <Input
            name="forename"
            placeholder="Nome"
            autoCapitalize="none"
          ></Input>
          <Input
            name="surname"
            placeholder="Sobrenome"
            autoCapitalize="none"
          ></Input>
          <Input
            name="date"
            placeholder="Data de nascimento"
            autoCapitalize="none"
            type="date"
          ></Input>
          <Input
            name="nationality"
            placeholder="Nacionalidade"
            autoCapitalize="none"
          ></Input>
          <Button type="submit" loading={loadingButton}>
            Cadastrar
          </Button>
          <a onClick={() => router.push('dashboard')}>Voltar</a>
        </Form>
      </Content>
    </Container>
  )
}

export default RegisterDrivers
