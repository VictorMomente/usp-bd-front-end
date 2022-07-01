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
import { registerConstructors } from '@services/api/routes/register-constructors'

type Register = {
  name: string
  nationality: string
  url: string
}

const RegisterConstructors: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user } = useAuth()

  const { addToast } = useToast()

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const [loadingButton, setLoadingButton] = useState(false)

  const handleRegisterConstructors = useCallback(
    async (data: Register): Promise<void> => {
      await registerConstructors(
        data.name,
        data.nationality,
        data.url,
        user.Tipo
      )
    },
    []
  )

  const handleSubmit = useCallback(
    async (data: Register): Promise<void> => {
      data.name = data.name.trim()
      data.nationality = data.name.trim()
      data.url = data.url.trim()
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          nationality: Yup.string().required('Nacionalidade obrigatória'),
          url: Yup.string().required('URL obrigatória')
        })
        await schema.validate(data, {
          abortEarly: false
        })

        handleRegisterConstructors(data)
        alert('Escuderia cadastrada com sucesso')
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
        <h1>Cadastrar Escuderia</h1>
        <h4>Preencha os dados da escuderia</h4>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome" autoCapitalize="none"></Input>
          <Input
            name="nationality"
            placeholder="Nacionalidade"
            autoCapitalize="none"
          ></Input>
          <Input name="url" placeholder="URL" autoCapitalize="none"></Input>
          <Button type="submit" loading={loadingButton}>
            Cadastrar
          </Button>
          <a onClick={() => router.push('dashboard')}>Voltar</a>
        </Form>
      </Content>
    </Container>
  )
}

export default RegisterConstructors
