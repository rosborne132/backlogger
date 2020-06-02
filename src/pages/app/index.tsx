import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { GET_USER_CONSOLES } from './[id]'

import { AppLayout, Game, LoadingScreen } from 'src/components/Elements'
import { Grid } from 'src/components/Utilities'

import { withApollo } from 'src/lib/apollo'

import { ModalContext } from 'src/context'

import { Game as GameType } from 'src/types'

export const GET_USER_GAMES = gql`
    query GetUserGames {
        getGames {
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

export default withApollo(() => {
    const { closeModal } = React.useContext(ModalContext)
    const { data: getGames } = useQuery(GET_USER_GAMES)
    const { data: getUserConsoles } = useQuery(GET_USER_CONSOLES)

    if (!getGames || !getUserConsoles) {
        closeModal()
        return <LoadingScreen />
    }

    return (
        <AppLayout consoles={getUserConsoles.getUserConsoles} header="Current Games">
            <Grid>
                {getGames.getGames.length
                    ? getGames.getGames.map(({ game }: { game: GameType }) => (
                          <Game key={game.id} cover={game.cover} name={game.name} slug={game.slug} />
                      ))
                    : null}
            </Grid>

            {!getGames.getGames.length && <h3 className="tc">No games in your backlog. :(</h3>}
        </AppLayout>
    )
})
