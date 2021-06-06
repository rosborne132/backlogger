import * as React from 'react'
import { withSSRContext } from 'aws-amplify'

import { AppLayout, UserGame } from 'src/components/Elements'
import { Grid } from 'src/components/Utilities'

import { UserGame as Game } from 'src/lib/types'

import { listUserConsoles, listUserGames } from '../graphql/queries'

export async function getServerSideProps({ req }) {
    console.log('hello')
    let consoles = []
    let games = []
    try {
        const { API } = withSSRContext({ req })
        const userConsoles = await API.graphql({ authMode: 'AMAZON_COGNITO_USER_POOLS', query: listUserConsoles })
        const userGames = await API.graphql({ authMode: 'AMAZON_COGNITO_USER_POOLS', query: listUserGames })
        consoles = userConsoles.data.listUserConsoles.items ?? []
        games = userGames.data.listUserGames.items ?? []
    } catch ({ errors }) {
        console.error(errors)
    }

    return {
        props: {
            consoles,
            games
        }
    }
}

export const renderUserGames = (games: Game[]): React.ReactNode[] =>
    games.map(({ game, id }) => (
        <UserGame
            key={game.id}
            cover={game.cover}
            id={game.id}
            inBacklog={game.inBacklog}
            name={game.name}
            slug={game.slug}
            userGameId={id}
        />
    ))

const AppHome = ({ consoles, games }) => (
    <AppLayout consoles={consoles} header="Collection">
        {games.length ? <Grid>{renderUserGames(games)}</Grid> : <h3 className="tc">No games in your collection. :(</h3>}
    </AppLayout>
)

export default AppHome
