import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AppLayout } from 'components/Elements'
import { withApollo } from 'lib/apollo'

const GET_USER_GAMES = gql`
    query GetUserGames {
        getGames {
            id
            name
        }
        getUserConsoles {
            id
            name
        }
    }
`

export default withApollo(() => {
    const { data } = useQuery(GET_USER_GAMES)

    if (!data) return <div>Loading</div>

    return (
        <AppLayout consoles={data.getUserConsoles}>
            <h2>Current Games</h2>
            <br />
            {data.getGames.map(({ id, name }) => (
                <div key={id}>
                    <h3>{name}</h3>
                </div>
            ))}
        </AppLayout>
    )
})
