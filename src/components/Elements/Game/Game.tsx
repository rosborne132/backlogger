import * as React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Cover, Platform } from 'src/types'

import styles from './Game.module.css'

type GameProps = {
    canHover?: boolean
    cover?: Cover
    id: string
    name: string
    platforms?: [Platform]
    slug: string
    userGameId?: string
}

type GameWrapperProps = {
    canHover: boolean
    children: React.ReactNode
    id: string
    userGameId?: string
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ canHover, children, id, userGameId }) => {
    const router = useRouter()

    return canHover ? (
        <motion.div
            data-testid="game"
            className="flex pointer"
            whileHover={{ y: -5 }}
            whileTap={{ y: -3 }}
            onClick={() => router.push({ pathname: `/app/game/${id}`, query: { userGameId } })}
        >
            {children}
        </motion.div>
    ) : (
        <div data-testid="game" className="flex">
            {children}
        </div>
    )
}

export const Game: React.FC<GameProps> = React.memo(
    ({ canHover = true, cover, id, name, slug, userGameId }: GameProps): JSX.Element => {
        const coverUrl = cover.url.length ? cover.url.replace('t_thumb', 't_cover_big') : ''

        return (
            <GameWrapper canHover={canHover} id={id} userGameId={userGameId}>
                {coverUrl.length ? (
                    <img data-testid="gameImage" src={coverUrl} alt={slug} className={styles.gameImg} />
                ) : (
                    <div className={styles.noGameImg}>
                        <p data-testid="noGameImage">{name}</p>
                    </div>
                )}
            </GameWrapper>
        )
    }
)
