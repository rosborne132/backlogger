import * as React from 'react'
import Link from 'next/link'

import { useAuthFunctions } from 'src/lib/auth'

const HeaderLink = ({
    className,
    children,
    onClick
}: {
    className?: string
    children: React.ReactNode
    onClick?: any
}) => (
    <li className={`dib pointer no-underline pointer white ${className}`} onClick={onClick}>
        {children}
    </li>
)

const Header = ({ children }: { children: React.ReactNode }) => (
    <header data-testid="header" className="bg-black pa1">
        <nav className="container">
            <ul className="list flex justify-between pa0 sans-serif">{children}</ul>
        </nav>
    </header>
)

export const LandingHeader: React.FC = React.memo(
    (): JSX.Element => {
        const { login } = useAuthFunctions()

        return (
            <Header>
                <span></span>

                <span>
                    <HeaderLink onClick={() => login()}>Login</HeaderLink>
                </span>
            </Header>
        )
    }
)

export const AppHeader: React.FC = React.memo(
    (): JSX.Element => {
        const { logout } = useAuthFunctions()

        return (
            <Header>
                <span>
                    <HeaderLink>
                        <Link href="/app">
                            <a className="white link">Home</a>
                        </Link>
                    </HeaderLink>
                </span>

                <span>
                    <HeaderLink onClick={() => logout()}>Logout</HeaderLink>
                </span>
            </Header>
        )
    }
)
