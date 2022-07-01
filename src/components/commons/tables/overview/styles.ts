import styled, { css } from 'styled-components'

interface ContainerProps {
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  border-radius: 5px;
  border: 2px solid;
  padding: 5px;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: red;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0px;
    margin: 0px;
    outline: 0;
    padding: 0px;
  }
`
