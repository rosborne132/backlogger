import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AppLayout } from '../../components/Elements'
import { withApollo } from '../../lib/apollo'

import { useRouter } from 'next/router'

const GET_USER_GAMES = gql`
    query GetUserGames {
        getUserGames {
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
    const router = useRouter()

    const { data } = useQuery(GET_USER_GAMES)

    if (!data) return <div>Loading</div>
    console.log(data)

    return (
        <AppLayout consoles={data.getUserConsoles}>
            <h2>Current Games</h2>
        </AppLayout>
    )
})
