import axios from 'axios'

import { User } from 'src/lib/types'

import { getConsoles } from './services'

export const consoleResolvers = {
    Query: {
        async getConsoles(parent: any, args: any, { user }: { user: User }) {
            try {
                const consolesFetched = await axios({
                    url: 'https://api-v3.igdb.com/platforms',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': process.env.API_KEY
                    },
                    data: 'fields name, slug; where product_family = (1,2,3,5); limit 100;'
                })

                if (consolesFetched.data === null || consolesFetched.data === undefined) return []

                const userConsoles = await getConsoles(user.client_id)

                const consoleChoices = consolesFetched.data.filter(
                    ({ id }) => !userConsoles.some(({ console }) => parseInt(console.id) === id)
                )

                return consoleChoices
            } catch (err) {
                console.error(err)
            }
        },
        async getUserConsoles(parent: any, args: any, { user }: { user: User }) {
            if (user === undefined) return []

            try {
                const userConsoles = await getConsoles(user.client_id)

                return userConsoles
            } catch (err) {
                console.error(err)
            }
        }
    }
}
