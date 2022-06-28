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
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user, signIn } = useAuth()

  const { addToast } = useToast()

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const [loadingButton, setLoadingButton] = useState(false)

  const handleSubmit = useCallback(
    async (data: credentials): Promise<void> => {
      data.email = data.email.trim()
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().required('Senha obrigatória')
        })
        await schema.validate(data, {
          abortEarly: false
        })

        if (!user) {
          setLoadingButton(true)

          const response = await signIn({
            email: data.email,
            password: data.password
          })

          if (response.challengeName === 'NEW_PASSWORD_REQUIRED') {
            console.log('• Entro no ChallengerName')
            // router.push(`${query.orgId}/newPassword`)
          } else {
            console.log('• NAOO Entro no ChallengerName')
            // router.push(`${query.orgId}/insights`)
          }
        }

        router.push('/dashboard')
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
    [signIn, addToast]
  )

  return (
    <Container>
      <Content>
        <h1>ENSINAMENTÉ</h1>
        <h4>Só não aprende quem não quer</h4>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Faça seu login</h2>
          <Input name="email" placeholder="Email" autoCapitalize="none"></Input>
          <Input name="password" type="password" placeholder="Senha"></Input>
          <Button type="submit" loading={loadingButton}>
            Entrar
          </Button>
          <a onClick={() => router.push('forgot')}>Esqueci minha senha</a>
        </Form>
      </Content>
    </Container>
  )
}

export default SignIn
