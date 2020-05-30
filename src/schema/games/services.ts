import { dbClient, docClient, parseData } from 'src/lib/dynamodb'
import { stage } from 'src/lib/stage'
import { UserGame } from 'src/types'

export const createSlug = (str: string) =>
    str
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .split(' ')
        .join('-')

const TableName = `backlogger-${stage}-user-games`

export const getGames = async (userId: string) => {
    const { Items } = await dbClient
        .query({
            TableName,
            IndexName: 'userId-index',
            ProjectionExpression: 'id, game, userId',
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

export const putGame = async (userGame: UserGame) => {
    const params = {
        TableName,
        Item: {
            id: userGame.id,
            console: userGame.game,
            userId: userGame.userId
        }
    }

    try {
        await docClient.put(params).promise()
    } catch (err) {
        console.error(err)
    } finally {
        return userGame
    }
}
