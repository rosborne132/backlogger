/* eslint no-shadow: 0 */
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import { InMemoryCache } from 'apollo-cache-inmemory'
import auth0 from './auth0'

const isDev = process.env.NODE_ENV !== 'production'
const url = isDev ? 'http://localhost:3000' : 'https://tracker.rosborne132.now.sh'

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
const createApolloClient = (initialState = {}, cookie) => {
    const enchancedFetch = (url, init) => fetch(url, {
        ...init,
        headers: {
            ...init.headers,
            Cookie: cookie,
        },
    }).then((response) => response)

    const cache = new InMemoryCache().restore(initialState)

    const client = new ApolloClient({
        uri: `${url}/api/graphql`,
        fetch: enchancedFetch,
        cache,
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

const withApollo = (PageComponent) => {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const client = apolloClient || initApolloClient(apolloState)

        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        )
    }

    WithApollo.getInitialProps = async (ctx) => {
        const { AppTree } = ctx
        let { apolloClient } = ctx

        apolloClient = Object.prototype.hasOwnProperty.call(ctx, 'req')
            ? initApolloClient({}, ctx.req.headers.cookie)
            : initApolloClient({})

        let pageProps = {}

        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx)
        }

        // If on the server
        if (typeof (window) === 'undefined') {
            const { req, res } = ctx
            const data = await auth0.getSession(req)

            // If there is no user, redirect to the login page
            if (data === null) {
                res.writeHead(302, {
                    Location: '/api/auth/login',
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
                            apolloClient,
                        }}
                    />,
                )
            } catch (err) {
                console.log(err)
            }

            Head.rewind()
        }

        const apolloState = apolloClient.cache.extract()
        return {
            ...pageProps,
            apolloState,
        }
    }

    return WithApollo
}

export default withApollo
