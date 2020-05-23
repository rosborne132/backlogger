import * as React from 'react'

type User = {
    userId: string
    username: string
}

type initialValues = {
    user: User | null
    setUser: (user: User) => void
}

const initialValues = {
    user: null,
    setUser: (user: User) => console.log(user)
}

export const UserContext = React.createContext<initialValues>(initialValues)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
