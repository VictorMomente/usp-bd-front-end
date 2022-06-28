import { ToastMessage } from '@hooks/toast'
import React from 'react'
import { Container } from './styles'
import Toast from './Toast'
import { useTransition } from 'react-spring'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 }
  })

  return (
    <Container>
      {messageWithTransitions((props, item) => (
        <Toast key={item.id} style={props} message={item}></Toast>
      ))}
    </Container>
  )
}

export default ToastContainer
