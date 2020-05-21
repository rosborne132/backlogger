import axios from 'axios'

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
        async getConsoles(parent, args) {
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

                return consolesFetched.data
            } catch (err) {
                console.error(err)
            }
        },
        getUserConsoles(parent, args, context) {
            if (context.accessTokenData === null) return

            try {
                const { client_id } = context.accessTokenData
                const user = users.find(({ userId }) => userId === client_id)

                return user?.consoles
            } catch (err) {
                console.error(err)
            }
        }
    }
}
