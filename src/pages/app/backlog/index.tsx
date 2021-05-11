import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { AppLayout, LoadingScreen } from 'src/components/Elements'
import { GET_USER_CONSOLES, GET_USER_GAMES } from 'src/lib/queries'
import { Grid } from 'src/components/Utilities'
import { renderUserGames } from '../index'
import { UserGame } from 'src/lib/types'
import { withApollo } from 'src/lib/apollo'

export default withApollo(() => {
    const { data: getGames } = useQuery(GET_USER_GAMES)
    const { data: getUserConsoles } = useQuery(GET_USER_CONSOLES)

    if (!getGames || !getUserConsoles) return <LoadingScreen />

    const backloggedGames = getGames.getGames.filter((game: UserGame) => game.game.inBacklog)

    return (
        <AppLayout consoles={getUserConsoles.getUserConsoles} header="Backlog">
            <Grid>{backloggedGames.length ? renderUserGames(backloggedGames, '') : null}</Grid>

            {!backloggedGames.length && <h3 className="tc">No games in your backlog. :(</h3>}
        </AppLayout>
    )
})
