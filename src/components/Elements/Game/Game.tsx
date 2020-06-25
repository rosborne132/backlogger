import * as React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Cover, Platform } from 'src/types'

type GameProps = {
    canHover: boolean
    cover?: Cover
    id: string
    name: string
    platforms?: [Platform]
    slug: string
}

type GameWrapperProps = {
    canHover: boolean
    children: React.ReactNode
    id: string
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ canHover, children, id }) => {
    const router = useRouter()
    return canHover ? (
        <motion.div
            data-testid="game"
            className="flex flex-column pointer w5"
            whileHover={{ y: -5 }}
            whileTap={{ y: -3 }}
            onClick={() => router.push('/app/game/[id]', `/app/game/${id}`)}
        >
            {children}
        </motion.div>
    ) : (
        <div data-testid="game" className="flex flex-column w5">
            {children}
        </div>
    )
}

export const Game: React.FC<GameProps> = React.memo(
    ({ canHover = true, cover, id, name, slug }: GameProps): JSX.Element => {
        const coverUrl = cover.url.length ? cover.url.replace('t_thumb', 't_cover_big') : ''

        return (
            <GameWrapper canHover={canHover} id={id}>
                {coverUrl.length ? (
                    <div className="h5">
                        <img data-testid="gameImage" src={coverUrl} alt={slug} className="ba bn br4 h5 w-100" />
                    </div>
                ) : (
                    <div className="ba bn br4 bg-near-white h5 flex justify-center items-center tc">
                        <p data-testid="noGameImage">{name}</p>
                    </div>
                )}
            </GameWrapper>
        )
    }
)
