import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { AppLayout } from '@components/Elements'
import { withApollo } from '@lib/apollo'

const GET_GAMES_BY_CONSOLE_ID = gql`
    query($consoleId: String!) {
        getGamesByConsoleId(consoleId: $consoleId) {
            id
            name
            console {
                id
                name
            }
        }
        getUserConsoles {
            id
            name
        }
    }
`

export default withApollo(() => {
    const router = useRouter()

    const { data } = useQuery(GET_GAMES_BY_CONSOLE_ID, {
        variables: { consoleId: router.query.id }
    })

    if (!data) return <div>Loading</div>

    const consoleName = data.getUserConsoles.filter(
        ({ id }) => id === router.query.id
    )[0].name

    return (
        <AppLayout consoles={data.getUserConsoles}>
            <h2>{consoleName}</h2>
            <br />
            {data.getGamesByConsoleId.length ? (
                data.getGamesByConsoleId.map(({ id, name }) => (
                    <div key={id}>
                        <h3>{name}</h3>
                    </div>
                ))
            ) : (
                <h3>No games listed for this console. :(</h3>
            )}
        </AppLayout>
    )
})
