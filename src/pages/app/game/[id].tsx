import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { AppLayout, Game, LoadingScreen } from 'src/components/Elements'
import { Grid } from 'src/components/Utilities'

import { withApollo } from 'src/lib/apollo'

import styles from './gameInfo.module.css'

// todo
// Use query on load to see if the user has this game in there backlog

const GET_GAME_BY_GAME_ID = gql`
    query GetGameByGameId($gameId: String!) {
        getGameByGameId(gameId: $gameId) {
            artworks {
                url
            }
            cover {
                url
            }
            id
            name
            platforms {
                abbreviation
                id
                name
            }
            screenshots {
                id
                url
            }
            similar_games {
                id
                name
                cover {
                    url
                }
            }
            slug
            storyline
            summary
            themes {
                name
                slug
            }
        }
    }
`

const renderThemeBadges = (badges: any) =>
    badges.map(({ name, slug }: { name: string; slug: string }) => (
        <div key={slug} className="badge">
            {name}
        </div>
    ))

const renderGames = (games: any) =>
    games.map((game: any) => <Game key={game.id} cover={game.cover} id={game.id} name={game.name} />)

const isEmpty = (game: any, value: any) => game.getGameByGameId === null || game.getGameByGameId[value] === null

export default withApollo(() => {
    const router = useRouter()
    const { data: game } = useQuery(GET_GAME_BY_GAME_ID, {
        variables: { gameId: router.query.id }
    })

    if (!game) return <LoadingScreen />

    const screenshots = !isEmpty(game, 'screenshots') ? game.getGameByGameId.screenshots : []
    const name = !isEmpty(game, 'name') ? game.getGameByGameId.name : ''
    const summary = !isEmpty(game, 'summary') ? game.getGameByGameId.summary : ''

    return (
        <AppLayout displayNav={false} images={screenshots}>
            <button onClick={() => router.back()} className={styles.backButton}>
                {'<'}
            </button>

            <header className={styles.gameHeader}>
                <h1 className="tc">
                    {name} {router.query.userGameId && <button>Remove</button>}
                </h1>

                {!isEmpty(game, 'getGameByGameId') ? (
                    <div id="game" style={{ position: 'absolute', bottom: '130px', left: '30px' }}>
                        <Game
                            canHover={false}
                            cover={game.getGameByGameId.cover}
                            id={game.getGameByGameId.id}
                            name={game.getGameByGameId.name}
                            slug={game.getGameByGameId.slug}
                        />
                    </div>
                ) : null}
            </header>

            <section>
                <p className={styles.gameSummary}>{summary}</p>
            </section>

            {!isEmpty(game, 'themes') && (
                <div className={styles.gameBadgeContainer}>{renderThemeBadges(game.getGameByGameId.themes)}</div>
            )}

            <section>
                <h2 className="tc">Similar Games</h2>
                {!isEmpty(game, 'similar_games') && <Grid>{renderGames(game.getGameByGameId.similar_games)}</Grid>}
            </section>
        </AppLayout>
    )
})
