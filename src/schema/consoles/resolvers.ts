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
        getConsoles(parent, args) {
            try {
                return consoles
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
