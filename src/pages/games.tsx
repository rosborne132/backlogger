import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Game, Layout } from '../components/Elements'
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

    const renderGames = games =>
        games.map(({ cover, id, name, platforms, slug }) => (
            <li key={id} className="list">
                <Game
                    cover={cover}
                    name={name}
                    platforms={platforms}
                    slug={slug}
                />
            </li>
        ))

    return (
        <Layout>
            <h1>Games</h1>
            {data.fetchGames !== null && (
                <ul className="grid">{renderGames(data.fetchGames)}</ul>
            )}
        </Layout>
    )
})
