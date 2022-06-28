import React, { ButtonHTMLAttributes } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container>
    <button type="button" disabled={rest.loading} {...rest}>
      {rest.loading && <TailSpin color="#ffffff" height={20} width={20} />}

      {!rest.loading && children}
    </button>
  </Container>
)

export default Button
