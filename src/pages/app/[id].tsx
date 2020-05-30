import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { AppLayout, Game, LoadingScreen } from 'src/components/Elements'
import { withApollo } from 'src/lib/apollo'

const GET_GAMES_BY_CONSOLE_ID = gql`
    query GetGamesByConsoleId($consoleId: String!) {
        getGamesByConsoleId(consoleId: $consoleId) {
            game {
                id
                name
                slug
                cover {
                    url
                }
            }
        }
    }
`

export const GET_USER_CONSOLES = gql`
    query GetUserConsoles {
        getUserConsoles {
            console {
                id
                name
                slug
            }
        }
    }
`

export default withApollo(() => {
    const router = useRouter()
    const { data: getUserConsoles } = useQuery(GET_USER_CONSOLES)
    const { data: getGamesByConsoleId } = useQuery(GET_GAMES_BY_CONSOLE_ID, {
        variables: { consoleId: router.query.id }
    })

    if (!getGamesByConsoleId || !getUserConsoles) return <LoadingScreen />

    const consoleName = getUserConsoles.getUserConsoles.find(
        ({ console: { id } }) => id === router.query.id
    ).console.name

    return (
        <AppLayout consoles={getUserConsoles.getUserConsoles}>
            <h2 className="tc">{consoleName}</h2>
            <br />
            {getGamesByConsoleId.getGamesByConsoleId.length ? (
                getGamesByConsoleId.getGamesByConsoleId.map(({ game }) => (
                    <Game
                        key={game.id}
                        cover={game.cover}
                        name={game.name}
                        slug={game.slug}
                    />
                ))
            ) : (
                <h3 className="tc">No games listed for this console. :(</h3>
            )}
        </AppLayout>
    )
})
