import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { GET_USER_CONSOLES } from '../[id]'
import { renderUserGames } from '../index'

import { AppLayout, Game, LoadingScreen } from 'src/components/Elements'
import { Grid } from 'src/components/Utilities'

import { withApollo } from 'src/lib/apollo'

export const GET_USER_GAMES = gql`
    query GetUserGames {
        getGames {
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

export default withApollo(() => {
    const { data: getGames } = useQuery(GET_USER_GAMES)
    const { data: getUserConsoles } = useQuery(GET_USER_CONSOLES)

    if (!getGames || !getUserConsoles) return <LoadingScreen />

    const backloggedGames = getGames.getGames.filter(game => game.game.inBacklog)

    return (
        <AppLayout consoles={getUserConsoles.getUserConsoles} header="Backlog">
            <Grid>{backloggedGames.length ? renderUserGames(backloggedGames, '') : null}</Grid>

            {!backloggedGames.length && <h3 className="tc">No games in your backlog. :(</h3>}
        </AppLayout>
    )
})
