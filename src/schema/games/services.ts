import { dbClient, docClient, parseData } from 'src/lib/dynamodb'
import { stage } from 'src/lib/stage'
import { UserGame } from 'src/types'

export const dataIsValid = fetchedData =>
    fetchedData.data === null ||
    fetchedData.data === undefined ||
    !fetchedData.data.length

export const createSlug = (str: string) =>
    str
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .split(' ')
        .join('-')

const TableName = `backlogger-${stage}-user-games`

export const getGames = async (userId: string) => {
    const inBacklog = true
    const { Items } = await dbClient
        .query({
            TableName,
            IndexName: 'userId-index',
            ProjectionExpression: 'game',
            KeyConditionExpression: '#user = :v_user',
            FilterExpression: '#game.#inBacklog = :inBacklog',
            ExpressionAttributeNames: {
                '#game': 'game',
                '#inBacklog': 'inBacklog',
                '#user': 'userId'
            },
            ExpressionAttributeValues: {
                ':inBacklog': { BOOL: inBacklog },
                ':v_user': { S: userId }
            }
        })
        .promise()

    return Items.map(item => parseData.unmarshall(item))
}

export const getGamesByConsoleId = async (
    consoleId: string,
    userId: string
) => {
    const { Items } = await dbClient
        .query({
            TableName,
            IndexName: 'userId-index',
            ProjectionExpression: 'game',
            KeyConditionExpression: '#user = :v_user',
            FilterExpression: '#game.#console.#id = :consoleId',
            ExpressionAttributeNames: {
                '#console': 'console',
                '#game': 'game',
                '#id': 'id',
                '#user': 'userId'
            },
            ExpressionAttributeValues: {
                ':consoleId': { S: consoleId },
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
            game: userGame.game,
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