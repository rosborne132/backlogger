import { v4 as uuid } from 'uuid'
import { User } from 'src/types'
import { putConsole } from './services'

export const consoleMutations = {
    Mutation: {
        async addUserConsole(parent: any, args: any, { user }: { user: User }) {
            if (user === undefined) return

            try {
                const userConsole = await putConsole({
                    id: uuid(),
                    console: { ...args.console },
                    userId: user.client_id
                })

                return userConsole.console
            } catch (err) {
                console.error(err)
            }
        }
    }
}
