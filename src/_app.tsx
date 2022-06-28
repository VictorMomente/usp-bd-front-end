import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './global'
import theme from './global/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  )
}
export default MyApp
