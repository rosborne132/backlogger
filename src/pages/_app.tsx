import * as React from 'react'
import { AppProps } from 'next/app'
import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'

import { UserProvider } from '@context'

import '@styles/index.css'

Amplify.configure({
    Auth: {
        region: 'us-west-2',
        userPoolId: process.env.USER_POOL_ID,
        userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,

        // example taken from https://aws-amplify.github.io/docs/js/authentication
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

export default ({ Component, pageProps }: AppProps) => (
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
)
