import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { GET_USER_CONSOLES } from './[id]'

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
                name
                slug
            }
        }
    }
`

export const renderUserGames = (games: any[], objName: string): JSX.Element[] => {
    const gameList = games[objName] !== undefined ? games[objName] : games

    return gameList.map(listedGame => {
        const { game } = listedGame
        const userGameId = listedGame.id !== undefined ? listedGame.id : ''

        return (
            <Game
                key={game.id}
                cover={game.cover}
                id={game.id}
                name={game.name}
                slug={game.slug}
                userGameId={userGameId}
            />
        )
    })
}

export default withApollo(() => {
    const { data: getGames } = useQuery(GET_USER_GAMES)
    const { data: getUserConsoles } = useQuery(GET_USER_CONSOLES)

    if (!getGames || !getUserConsoles) return <LoadingScreen />

    return (
        <AppLayout consoles={getUserConsoles.getUserConsoles} header="Collection">
            <Grid>{getGames.getGames.length ? renderUserGames(getGames, 'getGames') : null}</Grid>

            {!getGames.getGames.length && <h3 className="tc">No games in your collection. :(</h3>}
        </AppLayout>
    )
})
