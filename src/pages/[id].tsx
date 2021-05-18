import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

import { AppLayout, LoadingScreen } from 'src/components/Elements'
import { GET_GAMES_BY_CONSOLE_ID, GET_USER_CONSOLES } from 'src/lib/queries'
import { Grid } from 'src/components/Utilities'
import { renderUserGames } from './app/index'
import { withApollo } from 'src/lib/apollo'

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
