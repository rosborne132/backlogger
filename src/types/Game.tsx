import { Cover, Platform as Console } from 'src/types'

export type Game = {
    console: Console
    cover: Cover
    id: string
    inBacklog: boolean
    name: string
    slug: string
}

export type UserGame = {
    game: Game
    id: string
    userId: string
}
