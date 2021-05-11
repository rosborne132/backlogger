import { dbClient, docClient, parseData } from 'src/lib/dynamodb'
import { stage } from 'src/lib/stage'
import { UserConsole } from 'src/lib/types'

const TableName = `backlogger-${stage}-user-consoles`

export const getConsoles = async (userId: string) => {
    const { Items } = await dbClient
        .query({
            TableName,
            IndexName: 'userId-index',
            ProjectionExpression: 'id, console, userId',
            KeyConditionExpression: '#user = :v_user',
            ExpressionAttributeNames: {
                '#user': 'userId'
            },
            ExpressionAttributeValues: {
                ':v_user': { S: userId }
            }
        })
        .promise()

    return Items.map(item => parseData.unmarshall(item))
}

export const putConsole = async (userConsole: UserConsole) => {
    const params = {
        TableName,
        Item: {
            id: userConsole.id,
            console: userConsole.console,
            userId: userConsole.userId
        }
    }

    try {
        await docClient.put(params).promise()
    } catch (err) {
        console.error(err)
    } finally {
        return userConsole
    }
}
