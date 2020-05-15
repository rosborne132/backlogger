import * as React from 'react'

type Cover = {
    id: string
    url: string
}

type Platform = {
    id: string
    name: string
}

type GameProps = {
    name: string
    slug: string
    cover?: Cover
    platforms?: [Platform]
}

export const Game: React.FC<GameProps> = React.memo(
    ({ cover, name, platforms, slug }): JSX.Element => (
        <div className="w5 flex flex-column">
            {cover !== null ? (
                <div className="h5">
                    <img src={cover.url} alt={slug} className="w-100" />
                </div>
            ) : (
                <div className="bg-near-white h5 flex justify-center items-center tc">
                    <p>{name}</p>
                </div>
            )}
        </div>
    )
)
