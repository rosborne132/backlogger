import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

import { AppLayout, Game, LoadingScreen } from 'src/components/Elements'
import { GET_GAME_BY_GAME_ID } from 'src/lib/queries'
import { Grid } from 'src/components/Utilities'
import { withApollo } from 'src/lib/apollo'
import styles from './gameInfo.module.css'

// TODO
// Use query on load to see if the user has this game in there backlog

const renderThemeBadges = (badges: any) =>
    badges.map(({ name, slug }: { name: string; slug: string }) => (
        <div key={slug} className="badge">
            {name}
        </div>
    ))

const renderGames = (games: any) =>
    games.map((game: any) => <Game key={game.id} cover={game.cover} id={game.id} name={game.name} />)

const isEmpty = (game: any, value: any) =>
    game.fetchGameDetailsById === null || game.fetchGameDetailsById[value] === null

export default withApollo(() => {
    const router = useRouter()
    const { data: game } = useQuery(GET_GAME_BY_GAME_ID, {
        variables: { gameId: router.query.id }
    })

    if (!game) return <LoadingScreen />

    const screenshots = !isEmpty(game, 'screenshots') ? game.fetchGameDetailsById.screenshots : []
    const name = !isEmpty(game, 'name') ? game.fetchGameDetailsById.name : ''
    const summary = !isEmpty(game, 'summary') ? game.fetchGameDetailsById.summary : ''

    return (
        <AppLayout displayNav={false} images={screenshots}>
            <button onClick={() => router.back()} className={styles.backButton}>
                {'<'}
            </button>

            <header className={styles.gameHeader}>
                <h1 className="tc">
                    {name} {router.query.userGameId && <button>Remove</button>}
                </h1>

                {!isEmpty(game, 'fetchGameDetailsById') ? (
                    <div id="game" style={{ position: 'absolute', bottom: '130px', left: '30px' }}>
                        <Game
                            canHover={false}
                            cover={game.fetchGameDetailsById.cover}
                            id={game.fetchGameDetailsById.id}
                            name={game.fetchGameDetailsById.name}
                            slug={game.fetchGameDetailsById.slug}
                        />
                    </div>
                ) : null}
            </header>

            <section>
                <p className={styles.gameSummary}>{summary}</p>
            </section>

            {!isEmpty(game, 'themes') && (
                <div className={styles.gameBadgeContainer}>{renderThemeBadges(game.fetchGameDetailsById.themes)}</div>
            )}

            <section>
                <h2 className="tc">Similar Games</h2>
                {!isEmpty(game, 'similar_games') && <Grid>{renderGames(game.fetchGameDetailsById.similar_games)}</Grid>}
            </section>
        </AppLayout>
    )
})
