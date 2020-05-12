const games = [
    {
        id: 'sdfkhweriu',
        name: 'Wario Land Shake It',
        console: 'Wii'
    },
    {
        id: 'ghj4k3j',
        name: 'Super Paper Mario',
        console: 'Wii'
    },
    {
        id: 'fldjg24',
        name: 'Sonic Advance 3',
        console: 'GBA'
    },
    {
        id: 'gkkkf93j4',
        name: 'Pokemon Heart Gold',
        console: 'DS'
    }
]

export const gameResolvers = {
    Query: {
        getUserGames(parent, args) {
            try {
                return games
            } catch (err) {
                console.error(err)
            }
        }
    }
}
