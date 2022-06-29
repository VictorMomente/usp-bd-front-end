import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  h1 {
    margin-bottom: 12px;
  }

  h2 {
    margin-bottom: 12px;
  }

  button {
    width: 200px;
  }
`