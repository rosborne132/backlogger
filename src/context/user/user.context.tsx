import * as React from 'react'

type User = {
    userId: string
    username: string
}

type initialValues = {
    user: User
    setUser: () => void
}

const initialValues = {
    user: null,
    setUser: (user: User) => {}
}

export const UserContext = React.createContext<initialValues>(initialValues)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState(null)

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
