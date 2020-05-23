import axios from 'axios'

import { User } from '@types'

const users = [
    {
        userId: '7qusn3cgm9eu9bogliq8pm060m',
        username: 'ozborne132',
        consoles: [
            {
                id: 'fg34tdfgsdfg3t',
                name: 'WiiU'
            },
            {
                id: 'sdfgw54shqw345',
                name: 'PS4'
            },
            {
                id: 'wg2565678fgh44',
                name: '3DS'
            },
            {
                id: 'j3l20f9u09g34j',
                name: 'PS Vita'
            }
        ]
    },
    {
        userId: 'asdlkfjh2li3jhriudhv98wsdfh2',
        username: 'testUser1',
        consoles: [
            {
                id: 'sdfkhwfsk4tfj',
                name: 'Wii'
            },
            {
                id: 'ghj4k34woh8gtj',
                name: 'GBA'
            },
            {
                id: 'fldjgiuj2b4t24',
                name: 'DS'
            },
            {
                id: 'gkkkf93jsrtn4',
                name: 'PS Vita'
            }
        ]
    }
]

export const consoleResolvers = {
    Query: {
        async getConsoles() {
            try {
                const consolesFetched = await axios({
                    url: 'https://api-v3.igdb.com/platforms',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': process.env.API_KEY
                    },
                    data:
                        'fields name,slug; where product_family = (1,2,3,5); limit 100;'
                })

                if (
                    consolesFetched.data === null ||
                    consolesFetched.data === undefined
                )
                    return []

                return consolesFetched.data
            } catch (err) {
                console.error(err)
            }
        },
        getUserConsoles(parent: any, args: any, { user }: { user: User }) {
            if (user === undefined) return []

            try {
                const selectedUser = users.find(
                    ({ userId }) => userId === user.client_id
                )

                return selectedUser?.consoles
            } catch (err) {
                console.error(err)
            }
        }
    }
}
