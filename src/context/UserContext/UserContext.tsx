import * as React from 'react'

// type User = {
//     name: string
//     nickname: string
//     picture: string
// }

type Game = {
    console: string
    id: string
    name: string
}

type Console = {
    id: string
    name: string
}

type initialValues = {
    consoles: [Console]
    games: [Game]
    // loading: boolean
    setConsoles: () => void
    setGames: () => void
    // user: User | null
}

const initialValues = {
    consoles: [{} as Console],
    games: [{} as Game],
    // loading: false,
    setConsoles: () => {},
    setGames: () => {}
    // user: {} as User
}

export const UserContext = React.createContext<initialValues>(initialValues)

export const UserProvider = ({ children }) => {
    const [consoles, setConsoles] = React.useState([])
    const [games, setGames] = React.useState([])
    // const [loading, setLoading] = React.useState(false)
    // const [use, setUser] = React.useState(null)

    return (
        <UserContext.Provider
            value={{
                ...initialValues,
                consoles,
                games,
                setConsoles,
                setGames
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
