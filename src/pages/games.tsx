import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Layout } from '../components/Elements'
import { withApollo } from '../lib/apollo'

const GET_GAMES_BY_CONSOLE_ID = gql`
    query FetchGames {
        fetchGames {
            name
            id
            slug
            cover {
                url
            }
            platforms {
                id
                name
            }
        }
    }
`

export default withApollo(() => {
    const { data, loading } = useQuery(GET_GAMES_BY_CONSOLE_ID)

    if (loading) return <div>Loading</div>

    return (
        <Layout>
            <h1>Games</h1>
            <p>
                This is the about page, navigating between this page and Home is
                always pretty fast. However, when you navigate to the Profile
                page it takes more time because it uses SSR to fetch the user
                first
            </p>
        </Layout>
    )
})
