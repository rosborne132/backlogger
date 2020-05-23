import { v4 as uuid } from 'uuid'
import { Platform as Console, User } from 'src/types'
import { putConsole } from './services'

export const consoleMutations = {
    Mutation: {
        async addUserConsole(parent: any, args: any, { user }: { user: User }) {
            if (user === undefined) return

            try {
                // Pass object in Dynamodb helper
                const userConsole = await putConsole({
                    id: uuid(),
                    console: { ...args.console },
                    userId: user.client_id
                })

                // Return master created object
                return userConsole
            } catch (err) {
                console.error(err)
            }
        }
    }
}
