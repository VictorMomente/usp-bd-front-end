/* eslint-disable prettier/prettier */
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
import { parseCookies, destroyCookie } from 'nookies'

type credentials = {
  code: string
  password: string
}

const ConfirmForgetPasswordContent: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { user, forgotConfirmNewPassowrd } = useAuth()

  const { addToast } = useToast()

  if (user) console.log(`•Info do usuário: ${JSON.stringify(user)}`)

  const [loadingButton, setLoadingButton] = useState(false)

  const handleSubmit = useCallback(
    async (data: credentials): Promise<void> => {
      data.code = data.code.trim()
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          code: Yup.string().required('Código obrigatório'),
          password: Yup.string().required().min(8),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senhas devem ser iguais'
          )
        })
        await schema.validate(data, {
          abortEarly: false
        })

        if (!user) {
          await forgotConfirmNewPassowrd({
            codeConfirm: data.code,
            password: data.password
          })
        }

        alert('Senha alterado com sucesso')
        destroyCookie(null, 'usp-bd-front-end@forgot-email')
        router.push('/signin')
      } catch (err: any) {
        console.log(JSON.stringify(err.errors))
        if (
          err instanceof Yup.ValidationError &&
          err.errors.includes('Código obrigatório')
        ) {
          addToast({
            type: 'error',
            title: 'Erro ao resetar senha',
            description: 'Código é obrigatório'
          })
        } else if (
          err instanceof Yup.ValidationError &&
          err.errors.includes('password must be at least 8 characters')
        ) {
          addToast({
            type: 'error',
            title: 'Erro ao resetar senha',
            description: 'Senhas precisam ter no mínimo 8 caracteres'
          })
        } else if (
          err instanceof Yup.ValidationError &&
          err.errors.includes('Senhas devem ser iguais')
        ) {
          addToast({
            type: 'error',
            title: 'Erro ao resetar senha',
            description: 'Senhas não coincidem'
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
          <p>
            Insira o código enviado ao email abaixo para criar uma nova senha:
          </p>
          <p>{parseCookies(null)['usp-bd-front-end@forgot-email']}</p>
          <Input name="code" placeholder="Código" autoCapitalize="none"></Input>
          <Input name="password" type="password" placeholder="Senha"></Input>
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Confirme a senha"
          ></Input>
          <Button type="submit" loading={loadingButton}>
            Recuperar
          </Button>
          <a onClick={() => router.push('forgot')}>Voltar</a>
        </Form>
      </Content>
    </Container>
  )
}

export default ConfirmForgetPasswordContent
