import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AppLayout } from '../../components/Elements'
import withApollo from '../../../lib/apollo'

const GET_USER = gql`
    query GetUser {
        getUser{
            name
            nickname
            picture
        }
    }
`

const Profile: React.FC = (): JSX.Element => {
    const { data } = useQuery(GET_USER)

    if (!data) return <div>Loading</div>

    const { getUser: { name, nickname, picture } } = data

    return (
        <AppLayout>
            <h1>Profile</h1>

            <div>
                <h3>Profile (server rendered)</h3>
                <img src={picture} alt="profile" />
                <p>
                    <span className="fw_b">nickname: </span>
                    {nickname}
                </p>
                <p>
                    <span className="fw_b">name: </span>
                    {name}
                </p>
            </div>
        </AppLayout>
    )
}

export default withApollo(Profile)
