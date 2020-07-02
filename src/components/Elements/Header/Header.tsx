import * as React from 'react'
import { useRouter } from 'next/router'

import { useAuthFunctions } from 'src/lib/auth'

const Header = ({ children }: { children: React.ReactNode }) => <header data-testid="header">{children}</header>

export const LandingHeader: React.FC = React.memo(
    (): JSX.Element => {
        const router = useRouter()
        const { login } = useAuthFunctions()

        return (
            <Header>
                <h1 className="fake-logo">
                    <a onClick={() => router.push({ pathname: `/` })}>Backlogger</a>
                </h1>
                <nav>
                    <a onClick={() => login()}>Login</a>
                </nav>
            </Header>
        )
    }
)

export const AppHeader: React.FC = React.memo(
    (): JSX.Element => {
        const router = useRouter()
        const { logout } = useAuthFunctions()

        return (
            <Header>
                <h1 className="fake-logo">
                    <a onClick={() => router.push({ pathname: `/app` })}>Backlogger</a>
                </h1>
                <nav>
                    <a onClick={() => logout()}>Logout</a>
                </nav>
            </Header>
        )
    }
)
