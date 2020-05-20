import axios from 'axios'

const games = [
    {
        id: 'sdfkhweriu',
        name: 'Wario Land Shake It',
        console: {
            id: 'sdfkhwfsk4tfj',
            name: 'Wii'
        },
        inBacklog: false
    },
    {
        id: 'ghj4k3j',
        name: 'Super Paper Mario',
        console: {
            id: 'sdfkhwfsk4tfj',
            name: 'Wii'
        },
        inBacklog: true
    },
    {
        id: 'fldjg24',
        name: 'Sonic Advance 3',
        console: {
            id: 'ghj4k34woh8gtj',
            name: 'GBA'
        },
        inBacklog: true
    },
    {
        id: 'gkkkf93j4',
        name: 'Pokemon Heart Gold',
        console: {
            id: 'fldjgiuj2b4t24',
            name: 'DS'
        },
        inBacklog: true
    }
]

export const gameResolvers = {
    Query: {
        async fetchGames() {
            try {
                const gamesFetched = await axios({
                    url: 'https://api-v3.igdb.com/games',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': process.env.API_KEY
                    },
                    data:
                        'fields cover.url, name, slug, platforms.name; limit 100;'
                })

                return gamesFetched.data
            } catch (err) {
                console.error(err)
            }
        },
        getGames() {
            try {
                return games.filter(({ inBacklog }) => inBacklog)
            } catch (err) {
                console.error(err)
            }
        },
        getGamesByConsoleId(parent, args) {
            const gamesByConsoleId = games.filter(
                ({ console }) => console.id === args.consoleId
            )
            try {
                return gamesByConsoleId
            } catch (err) {
                console.error(err)
            }
        }
    }
}
