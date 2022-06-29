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
  login: string
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
      data.login = data.login.trim()
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          login: Yup.string().required('Login obrigatório'),
          password: Yup.string().required('Senha obrigatória')
        })
        await schema.validate(data, {
          abortEarly: false
        })

        if (!user) {
          setLoadingButton(true)

          await signIn({
            login: data.login,
            password: data.password
          })
        }
        router.push('/dashboard')
      } catch (err: any) {
        if (err.message === 'NotAuthorizedException') {
          console.log('• Usuário não encontrado')
          addToast({
            type: 'error',
            title: 'Não foi possível realizar o login',
            description: 'Login ou senha incorretos'
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
        <h1>Projeto Final (PF)</h1>
        <h4>SCC541 - Laboratório de Bases de Dados</h4>
        <h4>Prof. Dr. Caetano Traina Jr.</h4>
        <h4>PAE: Igor Alberte R. Eleutério</h4>
        <h4>ICMC/USP</h4>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Faça seu login</h2>
          <Input name="login" placeholder="Login" autoCapitalize="none"></Input>
          <Input name="password" type="password" placeholder="Senha"></Input>
          <Button type="submit" loading={loadingButton}>
            Entrar
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default SignIn
