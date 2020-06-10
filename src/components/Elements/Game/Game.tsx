import * as React from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Cover, Platform } from 'src/types'

type GameProps = {
    name: string
    slug: string
    cover?: Cover
    platforms?: [Platform]
}

export const Game: React.FC<GameProps> = React.memo(
    ({ cover, name, platforms, slug }): JSX.Element => {
        const router = useRouter()

        return (
            <motion.div
                data-testid="game"
                className="flex flex-column pointer w5"
                whileHover={{ y: -5 }}
                whileTap={{ y: -3 }}
                onClick={() => router.push('/app/game/[id]', `/app/game/${slug}`)}
            >
                {cover.url.length ? (
                    <div className="h5">
                        <img
                            data-testid="gameImage"
                            src={cover.url}
                            alt={slug}
                            className="bg-transparent ba bn br4 w-100"
                        />
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
