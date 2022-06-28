import Amplify from 'aws-amplify'
import type { AppProps } from 'next/app'

const cognitoCredentials = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_C6bRlFklR',
  userPoolWebClientId: '5eoc72olfvan7bucgr99ookf9e'
}

Amplify.configure({
  Auth: cognitoCredentials
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
