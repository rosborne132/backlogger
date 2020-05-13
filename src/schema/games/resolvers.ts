const games = [
    {
        id: 'sdfkhweriu',
        name: 'Wario Land Shake It',
        console: {
            id: 'sdfkhwfsk4tfj',
            name: 'Wii'
        }
    },
    {
        id: 'ghj4k3j',
        name: 'Super Paper Mario',
        console: {
            id: 'sdfkhwfsk4tfj',
            name: 'Wii'
        }
    },
    {
        id: 'fldjg24',
        name: 'Sonic Advance 3',
        console: {
            id: 'ghj4k34woh8gtj',
            name: 'GBA'
        }
    },
    {
        id: 'gkkkf93j4',
        name: 'Pokemon Heart Gold',
        console: {
            id: 'fldjgiuj2b4t24',
            name: 'DS'
        }
    }
]

export const gameResolvers = {
    Query: {
        getGames(parent, args) {
            try {
                return games
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
