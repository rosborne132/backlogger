import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { User } from 'src/types'
import { createSlug, getGameByConsole, putGame } from './services'

export const gameMutations = {
    Mutation: {
        async addUserGame(parent: any, args: any, { user }: { user: User }) {
            if (user === undefined) return

            try {
                let userGame
                let params = {
                    game: {
                        console: {
                            id: args.game.consoleId,
                            name: args.game.consoleName,
                            slug: args.game.consoleSlug
                        },
                        cover: {
                            id: '',
                            url: ''
                        },
                        id: '',
                        inBacklog: true,
                        name: args.game.name,
                        slug: ''
                    },
                    id: uuid(),
                    userId: user.client_id
                }

                const gameFetched = await axios({
                    url: 'https://api-v3.igdb.com/games',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': process.env.API_KEY
                    },
                    data: `fields cover.url, name, slug, platforms.name; search "${args.game.name}";`
                })

                const selectedGame = await getGameByConsole(gameFetched.data, params.game)

                if (selectedGame === null) {
                    params.game.id = uuid()
                    params.game.slug = createSlug(args.game.name)

                    // insert into DB
                    userGame = await putGame(params)

                    return userGame.game
                }

                if (selectedGame.cover !== undefined) {
                    params.game.cover.id = selectedGame.cover.id
                    params.game.cover.url = selectedGame.cover.url
                }

                params.game.id = selectedGame.id
                params.game.slug = selectedGame.slug

                // insert into DB
                userGame = await putGame(params)

                return userGame.game
            } catch (err) {
                console.error(err)
            }
        }
    }
}
