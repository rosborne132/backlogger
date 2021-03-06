import axios from 'axios'
import { dbClient, docClient, parseData } from 'src/lib/dynamodb'
import { stage } from 'src/lib/stage'
import { Console, Game as GameType, UserGame } from 'src/lib/types'

const TableName = `backlogger-${stage}-user-games`

export const createSlug = (str: string) =>
    str
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .split(' ')
        .join('-')

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

    const result = games.find((game: GameType) => {
        if (game.platforms === undefined) return false

        // Select game does not exist within the console the user selected
        const checkConsole = game.platforms.find(
            (gameConsole: Console) => parseInt(gameConsole.id) === parseInt(params.console.id)
        )

        return checkConsole
    })

    return result !== undefined ? result : null
}

export const fetchGameDetailsById = async (gameId: string) => {
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

export const fetchGamesByName = async (name: string) => {
    const query = `fields name; search "${name}";`

    const gameFetched = await queryAPI('games', query)

    return gameFetched.data
}

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------- CRUD OPS ----------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

export const deleteGame = async (id: string) => {
    let status: string = '200'

    const params = {
        TableName,
        Key: {
            id
        },
        ConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': id
        }
    }

    try {
        await docClient.delete(params).promise()
    } catch (err) {
        console.error(err)
        status = err.status
    }

    return { status }
}

export const getGames = async (userId: string) => {
    const { Items } = await dbClient
        .query({
            TableName,
            IndexName: 'userId-index',
            ProjectionExpression: 'game, id',
            KeyConditionExpression: '#user = :v_user',
            ExpressionAttributeNames: {
                '#user': 'userId'
            },
            ExpressionAttributeValues: {
                ':v_user': { S: userId }
            }
        })
        .promise()

    return Items.map((item: GameType) => parseData.unmarshall(item))
}

export const getGamesByConsoleId = async (consoleId: string, userId: string) => {
    const { Items } = await dbClient
        .query({
            TableName,
            IndexName: 'userId-index',
            ProjectionExpression: 'game, id',
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

export const patchGame = async (id: string, inBacklog: boolean) => {
    let status: string = '200'

    const params = {
        TableName,
        Key: {
            id
        },
        UpdateExpression: 'set #game.#inBacklog = :val',
        ExpressionAttributeNames: {
            '#game': 'game',
            '#inBacklog': 'inBacklog'
        },
        ExpressionAttributeValues: {
            ':val': inBacklog
        }
    }

    try {
        await docClient.update(params).promise()
    } catch (err) {
        console.error(err)
        status = err.status
    }

    return { status }
}

export const postGame = async (userGame: UserGame) => {
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
    }

    return userGame
}
