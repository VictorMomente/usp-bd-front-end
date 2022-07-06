import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 700px;

  button {
    width: 240px;
  }

  a {
    margin-top: 12px;
    color: #1c1c1c;
    text-decoration: underline;
    cursor: pointer;
  }
`
