import gql from 'graphql-tag'

// ------------------------------------
// ------------- Queries --------------
// ------------------------------------

export const GET_USER_CONSOLES = gql`
    query GetUserConsoles {
        getUserConsoles {
            console {
                id
                name
                slug
            }
        }
    }
`

export const GET_CONSOLES = gql`
    query GetConsoles {
        getConsoles {
            id
            name
            slug
        }
    }
`

// ------------------------------------
// ------------ Mutations -------------
// ------------------------------------

export const ADD_USER_CONSOLE = gql`
    mutation addUserConsole($console: UserConsoleInput) {
        addUserConsole(console: $console) {
            id
            name
            slug
        }
    }
`
