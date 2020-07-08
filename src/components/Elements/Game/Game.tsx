import * as React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Cover, Platform } from 'src/types'

import styles from './Game.module.css'

type GameProps = {
    canHover?: boolean
    cover?: Cover
    id: string
    inBacklog: boolean
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
            className={styles.gameLink}
            whileHover={{ y: -5 }}
            whileTap={{ y: -3 }}
            onClick={() => router.push({ pathname: `/app/game/${id}` })}
        >
            {children}
        </motion.div>
    ) : (
        <div data-testid="game" className={styles.game}>
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

const ButtonContainer = ({ gameId, inBacklog, userGameId }) => {
    const router = useRouter()
    return (
        <div>
            {inBacklog ? (
                <button onClick={() => console.log(`Remove game ${userGameId} from backlog`)}>-</button>
            ) : (
                <>
                    <button onClick={() => console.log(`Remove game ${userGameId} from collection`)}>-</button>
                    <button onClick={() => console.log(`Add game ${userGameId} to backlog`)}>+</button>
                </>
            )}

            <button onClick={() => router.push({ pathname: `/app/game/${gameId}` })}>O</button>
        </div>
    )
}

export const UserGame: React.FC<GameProps> = React.memo(
    ({ canHover = true, cover, id, inBacklog, name, slug, userGameId }: GameProps): JSX.Element => {
        const [showButtonOptions, setShowButtonOptions] = React.useState(true)
        const coverUrl = cover.url.length ? cover.url.replace('t_thumb', 't_cover_big') : ''

        console.log(inBacklog)

        return (
            <>
                {showButtonOptions && <ButtonContainer gameId={id} inBacklog={inBacklog} userGameId={userGameId} />}

                <motion.div
                    data-testid="game"
                    className={styles.gameLink}
                    whileHover={{ y: -5 }}
                    whileTap={{ y: -3 }}
                    onClick={() => setShowButtonOptions(!showButtonOptions)}
                >
                    {coverUrl.length ? (
                        <img data-testid="gameImage" src={coverUrl} alt={slug} className={styles.gameImg} />
                    ) : (
                        <div className={styles.noGameImg}>
                            <p data-testid="noGameImage">{name}</p>
                        </div>
                    )}
                </motion.div>
            </>
        )
    }
)
