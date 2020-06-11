import * as React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Cover, Platform } from 'src/types'

type GameProps = {
    id: string
    name: string
    slug: string
    cover?: Cover
    platforms?: [Platform]
}

export const Game: React.FC<GameProps> = React.memo(
    ({ cover, id, name, slug }): JSX.Element => {
        const router = useRouter()
        const coverUrl = cover.url.length ? cover.url.replace('t_thumb', 't_cover_big') : ''

        return (
            <motion.div
                data-testid="game"
                className="flex flex-column pointer w5"
                whileHover={{ y: -5 }}
                whileTap={{ y: -3 }}
                onClick={() => router.push('/app/game/[id]', `/app/game/${id}`)}
            >
                {coverUrl.length ? (
                    <div className="h5">
                        <img data-testid="gameImage" src={coverUrl} alt={slug} className="ba bn br4 h5 w-100" />
                    </div>
                ) : (
                    <div className="ba bn br4 bg-near-white h5 flex justify-center items-center tc">
                        <p data-testid="noGameImage">{name}</p>
                    </div>
                )}
            </motion.div>
        )
    }
)
