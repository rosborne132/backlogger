import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'

import { AppLayout, Badge, LoadingScreen } from 'src/components/Elements'
import { Grid } from 'src/components/Utilities'
import { renderGames } from './index'

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

const renderThemeBadges = (badges: any) => badges.map(({ name, slug }) => <Badge name={name} slug={slug} />)

const isEmpty = (game: any, value: any) => game.getGameByGameId === null || game.getGameByGameId[value] === null

export default withApollo(() => {
    const router = useRouter()
    const { data: game } = useQuery(GET_GAME_BY_GAME_ID, {
        variables: { gameId: router.query.id }
    })

    if (!game) return <LoadingScreen />

    return (
        <AppLayout displayNav={false}>
            <button onClick={() => router.back()}>Back</button>
            <p>Hello</p>
            {!isEmpty(game, 'themes') && <div>{renderThemeBadges(game.getGameByGameId.themes)}</div>}
        </AppLayout>
    )
})

//
