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

type credentials = {
  email: string
  password?: string
}

const ForgotContent: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user, forgot } = useAuth()

  const { addToast } = useToast()

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const [loadingButton, setLoadingButton] = useState(false)

  const handleSubmit = useCallback(
    async (data: credentials): Promise<void> => {
      data.email = data.email.trim()
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email()
        })
        await schema.validate(data, {
          abortEarly: false
        })

        if (!user) {
          setLoadingButton(true)
          await forgot(data.email)
        }

        router.push('/forgotnew')
      } catch (err: any) {
        if (err.code === 'NotAuthorizedException') {
          console.log('• Usuário não encontrado')
          addToast({
            type: 'error',
            title: 'Não foi possível realizar o login',
            description: 'Email ou senha incorretos'
          })
        } else if (err instanceof Yup.ValidationError) {
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
        <h1>ENSINAMENTÉ</h1>
        <h4>Só não aprende quem não quer</h4>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Recuperar senha</h2>
          <Input name="email" placeholder="Email" autoCapitalize="none"></Input>
          <Button type="submit" loading={loadingButton}>
            Recuperar
          </Button>
          <a onClick={() => router.push('signin')}>Voltar</a>
        </Form>
      </Content>
    </Container>
  )
}

export default ForgotContent
