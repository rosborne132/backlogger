import * as React from 'react'
import { UserContext } from 'src/context'

export const UserContextWrapper = ({ children }: any) => (
    <UserContext.Provider
        value={{
            user: { userId: 'asdf1234', username: 'TestUser' },
            setUser: () => {}
        }}
    >
        {children}
    </UserContext.Provider>
)
