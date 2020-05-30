import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { GET_USER_CONSOLES } from './[id]'

import { AppLayout, Game, LoadingScreen } from 'src/components/Elements'
import { withApollo } from 'src/lib/apollo'
import { ModalContext } from 'src/context'

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
        <AppLayout consoles={getUserConsoles.getUserConsoles}>
            <h2>Current Games</h2>
            <br />

            {getGames.getGames.map(({ game }) => (
                <Game
                    key={game.id}
                    cover={game.cover}
                    name={game.name}
                    slug={game.slug}
                />
            ))}
        </AppLayout>
    )
})
