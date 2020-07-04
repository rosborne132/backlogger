import * as React from 'react'
import Amplify from '@aws-amplify/core'
import { Auth } from '@aws-amplify/auth'

import 'src/styles/normalize.css'
import 'src/styles/style.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type AppProps = {
    Component: React.FC
    pageProps: any
}

Amplify.configure({
    Auth: {
        region: 'us-west-2',
        userPoolId: process.env.USER_POOL_ID,
        userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
        cookieStorage: {
            domain: process.env.AUTH_COOKIE_DOMAIN,
            path: '/',
            expires: 3,
            secure: false
        }
    }
})

Auth.configure({
    oauth: {
        domain: process.env.IDP_DOMAIN,
        scope: ['email', 'openid'],
        redirectSignIn: process.env.REDIRECT_SIGN_IN,
        redirectSignOut: process.env.REDIRECT_SIGN_OUT,
        responseType: 'token'
    }
})

export default ({ Component, pageProps }: AppProps): JSX.Element => <Component {...pageProps} />
