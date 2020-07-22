import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { AppLayout, UserGame, LoadingScreen } from 'src/components/Elements'
import { GET_USER_CONSOLES, GET_USER_GAMES } from 'src/lib/queries'
import { Grid } from 'src/components/Utilities'
import { UserGame as Game } from 'src/lib/types'
import { withApollo } from 'src/lib/apollo'

export const renderUserGames = (games: Game[], objName: string): JSX.Element[] => {
    const gameList = games[objName] !== undefined ? games[objName] : games

    return gameList.map((listedGame: Game) => {
        const { game } = listedGame
        const userGameId = listedGame.id !== undefined ? listedGame.id : ''

        return (
            <UserGame
                key={game.id}
                cover={game.cover}
                id={game.id}
                inBacklog={game.inBacklog}
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
