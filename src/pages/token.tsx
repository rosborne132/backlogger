import * as React from 'react'
import { useRouter } from 'next/router'
import { useAuthRedirect } from 'aws-cognito-next'
import queryString from 'query-string'
import { LoadingScreen } from 'src/components/Elements'

const extractFirst = (value: string | string[]) =>
    Array.isArray(value) ? value[0] : value

export default () => {
    const router = useRouter()
    useAuthRedirect(() => {
        const redirectUriAfterSignIn =
            extractFirst(queryString.parse(window.location.search).to || '') ||
            '/app'

        router.replace(redirectUriAfterSignIn)
    })

    return <LoadingScreen />
}