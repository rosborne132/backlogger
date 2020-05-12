import dbClient, { parseData } from '../../../lib/dynamodb'

const getDecks = async ({ nickname }) => {
    const { Items } = await dbClient.query({
        TableName: 'user-decks',
        IndexName: 'userIndex',
        KeyConditionExpression: '#user = :v_user',
        ExpressionAttributeNames: {
            '#user': 'username'
        },
        ExpressionAttributeValues: {
            ':v_user': { S: nickname }
        }
    }).promise()

    return Items.map((item) => parseData.unmarshall(item))
}

const deckResolvers = {
    Query: {
        async getUserDecks(parent, args, { user }) {
            try {
                return await getDecks(user)
            } catch (err) {
                console.error(err)
            }
        },
    },
}

export default deckResolvers
