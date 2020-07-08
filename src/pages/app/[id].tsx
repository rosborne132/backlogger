import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { AppLayout, LoadingScreen } from 'src/components/Elements'
import { Grid } from 'src/components/Utilities'
import { renderUserGames } from './index'

import { withApollo } from 'src/lib/apollo'

const GET_GAMES_BY_CONSOLE_ID = gql`
    query GetGamesByConsoleId($consoleId: String!) {
        getGamesByConsoleId(consoleId: $consoleId) {
            id
            game {
                cover {
                    url
                }
                id
                inBacklog
                name
                slug
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
        ({ console: { id } }: { console: { id: string } }) => id === router.query.id
    ).console.name

    return (
        <AppLayout consoles={getUserConsoles.getUserConsoles} header={consoleName}>
            <Grid>
                {getGamesByConsoleId.getGamesByConsoleId.length
                    ? renderUserGames(getGamesByConsoleId, 'getGamesByConsoleId')
                    : null}
            </Grid>

            {!getGamesByConsoleId.getGamesByConsoleId.length && (
                <h3 className="tc">No games listed for this console. :(</h3>
            )}
        </AppLayout>
    )
})
