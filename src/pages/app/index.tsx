import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Layout } from '../../components/Elements'
import { withApollo } from '../../lib/apollo'

const GET_USER_GAMES = gql`
    query GetUserGames {
        getUserGames {
            id
            console
        }
    }
`

export default withApollo(() => {
    const { data } = useQuery(GET_USER_GAMES)

    if (!data) return <div>Loading</div>

    return (
        <Layout>
            <h1>Current Games</h1>

            {data.getUserGames.map(({ id, console }) => (
                <div key={id}>
                    <h3>{console}</h3>
                </div>
            ))}
        </Layout>
    )
})
