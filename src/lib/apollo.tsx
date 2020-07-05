import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'

import { getServerSideAuth } from 'src/lib/auth'

import { ModalProvider } from 'src/context'

const isDev = process.env.NODE_ENV !== 'production'
const url = isDev ? 'http://localhost:3000' : 'https://tracker.rosborne132.now.sh'

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
const createApolloClient = (initialState = {}, cookie = '') => {
    const enchancedFetch = (url: string, init: any) =>
        fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                Cookie: cookie
            }
        }).then((response: any) => response)

    const cache = new InMemoryCache().restore(initialState)

    const client = new ApolloClient({
        uri: `${url}/api/graphql`,
        fetch: enchancedFetch,
        cache
    })

    return client
}

const initApolloClient = (initialState = {}, cookie = '') => {
    // Make sure to create a new client for every server-side request so that data
    // isn"t shared between connections (which would be bad)

    if (typeof window === 'undefined') {
        return createApolloClient(initialState, cookie)
    }

    // Reuse client on the client-side
    return createApolloClient(initialState)
}

export const withApollo = (PageComponent: any) => {
    const WithApollo = ({
        apolloClient,
        apolloState,
        initialAuth,
        ...pageProps
    }: {
        apolloClient: any
        apolloState: any
        initialAuth: any
    }) => {
        const client = apolloClient || initApolloClient(apolloState)

        return (
            <ApolloProvider client={client}>
                <ModalProvider>
                    <PageComponent {...pageProps} />
                </ModalProvider>
            </ApolloProvider>
        )
    }

    WithApollo.getInitialProps = async (ctx: any) => {
        const { AppTree } = ctx
        let { apolloClient } = ctx

        apolloClient = Object.prototype.hasOwnProperty.call(ctx, 'req')
            ? initApolloClient({}, ctx.req.headers.cookie)
            : initApolloClient({})

        let pageProps = {}

        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx)
        }

        let initialAuth = null

        // If on the server
        if (typeof window === 'undefined') {
            const { req, res } = ctx
            initialAuth = await getServerSideAuth(req)

            // If there is no user, redirect to the login page
            if (initialAuth === null) {
                res.writeHead(302, {
                    Location: '/'
                })
                res.end()
                return
            }

            if (ctx.res && ctx.res.finished) {
                return pageProps
            }

            try {
                const { getDataFromTree } = await import('@apollo/react-ssr')

                await getDataFromTree(
                    <AppTree
                        pageProps={{
                            ...pageProps,
                            apolloClient
                        }}
                    />
                )
            } catch (err) {
                console.error(err)
            }

            Head.rewind()
        }

        const apolloState = apolloClient.cache.extract()

        return {
            ...pageProps,
            apolloState,
            initialAuth
        }
    }

    return WithApollo
}
