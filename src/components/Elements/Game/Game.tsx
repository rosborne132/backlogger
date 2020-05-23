import * as React from 'react'

import { Cover, Platform } from 'src/types'

type GameProps = {
    name: string
    slug: string
    cover?: Cover
    platforms?: [Platform]
}

export const Game: React.FC<GameProps> = React.memo(
    ({ cover, name, platforms, slug }): JSX.Element => (
        <div data-testid="game" className="w5 flex flex-column">
            {cover !== null ? (
                <div className="h5">
                    <img
                        data-testid="gameImage"
                        src={cover.url}
                        alt={slug}
                        className="w-100"
                    />
                </div>
            ) : (
                <div className="bg-near-white h5 flex justify-center items-center tc">
                    <p data-testid="noGameImage">{name}</p>
                </div>
            )}
        </div>
    )
)
