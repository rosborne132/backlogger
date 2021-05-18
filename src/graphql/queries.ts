/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserGame = /* GraphQL */ `
    query GetUserGame($id: ID!) {
        getUserGame(id: $id) {
            game {
                console {
                    abbreviation
                    id
                    name
                    slug
                }
                cover {
                    id
                    url
                }
                id
                inBacklog
                name
                slug
            }
            id
            createdAt
            updatedAt
        }
    }
`
export const listUserGames = /* GraphQL */ `
    query ListUserGames($filter: ModelUserGameFilterInput, $limit: Int, $nextToken: String) {
        listUserGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                game {
                    id
                    inBacklog
                    name
                    slug
                }
                id
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`
export const getUserConsole = /* GraphQL */ `
    query GetUserConsole($id: ID!) {
        getUserConsole(id: $id) {
            console {
                abbreviation
                id
                name
                slug
            }
            id
            createdAt
            updatedAt
        }
    }
`
export const listUserConsoles = /* GraphQL */ `
    query ListUserConsoles($filter: ModelUserConsoleFilterInput, $limit: Int, $nextToken: String) {
        listUserConsoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                console {
                    abbreviation
                    id
                    name
                    slug
                }
                id
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`
