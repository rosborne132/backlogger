import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AppLayout } from '../../components/Elements'
import withApollo from '../../lib/apollo'

const GET_USER_DECKS = gql`
    query GetUserDecks {
        getUserDecks {
            username
            deckId
            deckName
        }
    }
`

const App: React.FC = (): JSX.Element => {
    const { data } = useQuery(GET_USER_DECKS)

    if (!data) return <div>Loading</div>

    return (
        <AppLayout>
            <h1>Current Decks</h1>

            { data.getUserDecks.map(({ deckId, deckName }) => (
                <div key={deckId}>
                    <h3>{ deckName }</h3>
                </div>
            ))}
        </AppLayout>
    )
}

export default withApollo(App)
