import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Layout } from '../../components/Elements'
import { withApollo } from '../../lib/apollo'

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
    const { data } = useQuery(GET_USER_GAMES)

    React.useEffect(() => {
        console.log(data)
    }, [data])

    if (!data) return <div>Loading</div>

    return (
        <Layout>
            <h2>Current Consoles</h2>

            {data.getUserConsoles.map(({ id, name }) => (
                <div key={id}>
                    <h3>{name}</h3>
                </div>
            ))}

            <br />

            <h2>Current Games</h2>
            {data.getUserGames.map(({ id, name }) => (
                <div key={id}>
                    <h3>{name}</h3>
                </div>
            ))}
        </Layout>
    )
})
