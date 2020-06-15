import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { AppLayout, Badge, Game, LoadingScreen } from 'src/components/Elements'
import { Grid } from 'src/components/Utilities'

import { withApollo } from 'src/lib/apollo'

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
    badges.map(({ name, slug }: { name: string; slug: string }) => <Badge key={slug} name={name} slug={slug} />)

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
            <button
                onClick={() => router.back()}
                className="ba bn br4 fixed h2 mv2 pointer shadow-1 w2 z-5"
                style={{ top: '60px', left: '20px' }}
            >
                {'<'}
            </button>

            <header>
                <h1 className="tc">{name}</h1>
            </header>

            <section>
                <p className="tl">{summary}</p>
            </section>

            {!isEmpty(game, 'themes') && <div className="flex">{renderThemeBadges(game.getGameByGameId.themes)}</div>}

            <section>
                <h2 className="tc">Similar Games</h2>
                {!isEmpty(game, 'similar_games') && <Grid>{renderGames(game.getGameByGameId.similar_games)}</Grid>}
            </section>
        </AppLayout>
    )
})
