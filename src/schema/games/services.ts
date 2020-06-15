import axios from 'axios'
import { dbClient, docClient, parseData } from 'src/lib/dynamodb'
import { stage } from 'src/lib/stage'
import { Game as GameType, UserGame } from 'src/types'

export const dataIsValid = (fetchedData: any) => fetchedData !== null || fetchedData !== undefined || fetchedData.length

export const queryAPI = async (endpoint: string, query: string) =>
    await axios({
        url: `https://api-v3.igdb.com/${endpoint}`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'user-key': process.env.API_KEY
        },
        data: query
    })

export const getGameByConsole = (games: GameType[], params: GameType) => {
    if (!dataIsValid(games)) return null

    const result = games.find(game => {
        if (game.platforms === undefined) return false

        // Select game does not exist within the console the user selected
        const checkConsole = game.platforms.find(
            gameConsole => parseInt(gameConsole.id) === parseInt(params.console.id)
        )

        return checkConsole
    })

    return result !== undefined ? result : null
}

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

export const getGamesByConsoleId = async (consoleId: string, userId: string) => {
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

export const getGameByGameId = async (gameId: string) => {
    const query = `
    fields
    artworks.url,
    cover.url,
    name,
    platforms.abbreviation,
    platforms.name,
    screenshots.id,
    screenshots.url,
    similar_games.name,
    similar_games.cover.url,
    slug,
    storyline,
    summary,
    themes.name,
    themes.slug;
    where id = ${gameId};`

    const gameFetched = await queryAPI('games', query)

    return gameFetched.data[0]
}
