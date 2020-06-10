import axios from 'axios'
import { User } from 'src/types'
import { getGames, getGamesByConsoleId, getGameByGameId } from './services'

export const gameResolvers = {
    Query: {
        async fetchGames(parent, args) {
            try {
                const gamesFetched = await axios({
                    url: 'https://api-v3.igdb.com/games',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': process.env.API_KEY
                    },
                    data: 'fields cover.url, name, slug, platforms.name; limit 100;'
                })

                return gamesFetched.data
            } catch (err) {
                console.error(err)
            }
        },
        async getGames(parent, args, { user }: { user: User }) {
            try {
                return await getGames(user.client_id)
            } catch (err) {
                console.error(err)
            }
        },
        async getGamesByConsoleId(parent, args, { user }: { user: User }) {
            try {
                return await getGamesByConsoleId(args.consoleId, user.client_id)
            } catch (err) {
                console.error(err)
            }
        },
        async getGameByGameId(parent, args, { user }: { user: User }) {
            try {
                return await getGameByGameId(args.gameId, 'user.client_id')
                // return await getGameByGameId(args.gameId, user.client_id)
            } catch (err) {
                console.error(err)
            }
        }
    }
}
