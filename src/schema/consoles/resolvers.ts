import axios from 'axios'

const consoles = [
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
        getUserConsoles(parent, args) {
            try {
                return consoles
            } catch (err) {
                console.error(err)
            }
        }
    }
}
