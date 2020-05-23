import { dbClient, docClient, parseData } from 'src/lib/dynamodb'
import { stage } from 'src/lib/stage'
import { Platform as Console } from 'src/types'

type UserConsole = {
    id: string
    console: Console
    userId: string
}

console.log(stage)

const TableName = 'user-items-prod'

export const putConsole = async (
    userConsole: UserConsole
): Promise<UserConsole> => {
    const params = {
        TableName,
        Item: {
            id: userConsole.id,
            console: userConsole.console,
            userId: userConsole.userId
        }
    }

    console.log(params)
    // try {
    //     await docClient.put(params).promise()
    // } catch (err) {
    //     console.error(err)
    // } finally {
    //     const { itemId, itemName, isPurchased } = params.Item
    //     return { itemId, itemName, isPurchased }
    // }
}
