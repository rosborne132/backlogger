import gql from 'graphql-tag'

// ------------------------------------
// ------------- Queries --------------
// ------------------------------------

export const GET_GAMES_BY_CONSOLE_ID = gql`
    query GetGamesByConsoleId($consoleId: String!) {
        getGamesByConsoleId(consoleId: $consoleId) {
            id
            game {
                cover {
                    url
                }
                id
                inBacklog
                name
                slug
            }
        }
    }
`

export const GET_GAME_BY_GAME_ID = gql`
    query FetchGameDetailsById($gameId: String!) {
        fetchGameDetailsById(gameId: $gameId) {
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

export const GET_GAMES_BY_NAME = gql`
    query FetchGamesByName($name: String) {
        fetchGamesByName(name: $name) {
            name
        }
    }
`

export const GET_USER_GAMES = gql`
    query GetUserGames {
        getGames {
            id
            game {
                cover {
                    url
                }
                id
                inBacklog
                name
                slug
            }
        }
    }
`

// ------------------------------------
// ------------ Mutations -------------
// ------------------------------------

export const ADD_USER_GAME = gql`
    mutation addUserGame($game: UserGameInput) {
        addUserGame(game: $game) {
            console {
                id
                name
            }
            cover {
                url
            }
            id
            inBacklog
            name
        }
    }
`

export const DELETE_USER_GAME = gql`
    mutation removeGame($game: GameInput) {
        removeGame(game: $game) {
            status
        }
    }
`

export const UPDATE_USER_GAME = gql`
    mutation updateGame($game: GameInput) {
        updateGame(game: $game) {
            status
        }
    }
`
