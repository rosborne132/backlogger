import * as React from 'react'
import Amplify from 'aws-amplify'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'

import awsExports from '../aws-exports'

import 'src/styles/normalize.css'
import 'src/styles/style.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type AppProps = {
    Component: React.FC
    pageProps: any
}

Amplify.configure({ ...awsExports, ssr: true })

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
    <AmplifyAuthenticator>
        <Component {...pageProps} />
    </AmplifyAuthenticator>
)

export default App
