import * as React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Cover, Platform } from 'src/lib/types'
import { ModalContext } from 'src/context'
import { RemoveFromCollection, UpdateGameInBacklog } from 'src/components/Elements'
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

type ButtonContainerProps = {
    onClick: () => void
    userGameId: string | undefined
    inBacklog: boolean
    gameId: string
}

export const GameWrapper: React.FC = ({ canHover, children, id }: GameWrapperProps): React.ReactNode => {
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

export const Game: React.FC = React.memo(
    ({ canHover = true, cover, id, name, slug, userGameId }: GameProps): React.ReactNode => {
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

const ButtonContainer = ({ gameId, inBacklog, onClick, userGameId }: ButtonContainerProps): React.ReactNode => {
    const { openModal } = React.useContext(ModalContext)
    const router = useRouter()
    const variants = {
        open: { y: 0 },
        closed: { y: 50 }
    }
    return (
        <motion.div
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            className={styles.buttonContainerBackground}
            onClick={onClick}
        >
            <div className={styles.buttonContainer}>
                {inBacklog ? (
                    <button
                        onClick={() => openModal(<UpdateGameInBacklog userGameId={userGameId} inBacklog={false} />)}
                        className="cancel"
                    >
                        -
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => openModal(<RemoveFromCollection userGameId={userGameId} />)}
                            className="cancel"
                        >
                            -
                        </button>
                        <button
                            onClick={() => openModal(<UpdateGameInBacklog userGameId={userGameId} inBacklog={true} />)}
                        >
                            +
                        </button>
                    </>
                )}

                <button onClick={() => router.push({ pathname: `/app/game/${gameId}` })} className="secorndary">
                    O
                </button>
            </div>
        </motion.div>
    )
}

export const UserGame: React.FC = React.memo(
    ({ cover, id, inBacklog, name, slug, userGameId }: GameProps): React.ReactNode => {
        const [showButtonOptions, setShowButtonOptions] = React.useState(false)
        const coverUrl = cover.url.length ? cover.url.replace('t_thumb', 't_cover_big') : ''

        return (
            <div className={styles.userGame}>
                {showButtonOptions && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ButtonContainer
                            gameId={id}
                            inBacklog={inBacklog}
                            userGameId={userGameId}
                            onClick={() => setShowButtonOptions(false)}
                        />
                    </motion.div>
                )}

                <motion.div
                    data-testid="game"
                    className={`${styles.gameLink} ${showButtonOptions ? styles.gameSelected : ''}`}
                    whileTap={{ y: 3 }}
                    onClick={() => setShowButtonOptions(true)}
                >
                    {coverUrl.length ? (
                        <img data-testid="gameImage" src={coverUrl} alt={slug} className={styles.gameImg} />
                    ) : (
                        <div className={styles.noGameImg}>
                            <p data-testid="noGameImage">{name}</p>
                        </div>
                    )}
                </motion.div>
            </div>
        )
    }
)
