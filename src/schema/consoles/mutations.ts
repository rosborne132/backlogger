import { v4 as uuid } from 'uuid'
import { Platform as Console, User } from '@types'
import { putConsole } from './services'

export const consoleMutations = {
    Mutation: {
        async addUserConsole(
            parent: any,
            args: Console,
            { user }: { user: User }
        ) {
            if (user === undefined) return

            try {
                // Pass object in Dynamodb helper
                const userConsole = await putConsole({
                    id: uuid(),
                    console: { ...args.console },
                    userId: user.client_id
                })

                // Return master created object
                return args.console
            } catch (err) {
                console.error(err)
            }
        }
    }
}
