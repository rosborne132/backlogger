/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserGame = /* GraphQL */ `
    mutation CreateUserGame($input: CreateUserGameInput!, $condition: ModelUserGameConditionInput) {
        createUserGame(input: $input, condition: $condition) {
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
export const updateUserGame = /* GraphQL */ `
    mutation UpdateUserGame($input: UpdateUserGameInput!, $condition: ModelUserGameConditionInput) {
        updateUserGame(input: $input, condition: $condition) {
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
export const deleteUserGame = /* GraphQL */ `
    mutation DeleteUserGame($input: DeleteUserGameInput!, $condition: ModelUserGameConditionInput) {
        deleteUserGame(input: $input, condition: $condition) {
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
export const createUserConsole = /* GraphQL */ `
    mutation CreateUserConsole($input: CreateUserConsoleInput!, $condition: ModelUserConsoleConditionInput) {
        createUserConsole(input: $input, condition: $condition) {
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
export const updateUserConsole = /* GraphQL */ `
    mutation UpdateUserConsole($input: UpdateUserConsoleInput!, $condition: ModelUserConsoleConditionInput) {
        updateUserConsole(input: $input, condition: $condition) {
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
export const deleteUserConsole = /* GraphQL */ `
    mutation DeleteUserConsole($input: DeleteUserConsoleInput!, $condition: ModelUserConsoleConditionInput) {
        deleteUserConsole(input: $input, condition: $condition) {
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
