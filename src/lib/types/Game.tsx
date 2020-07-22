import { Cover, Platform as Console } from 'src/lib/types'

export type Game = {
    console?: Console
    cover?: Cover
    id: string
    inBacklog?: boolean
    name: string
    platforms?: Console[]
    slug: string
}

export type UserGame = {
    game: Game
    id: string
    userId: string
}
