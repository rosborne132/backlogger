import * as React from 'react'

import { useAuthFunctions } from 'src/lib/auth'

const HeaderLink = ({ className, onClick, text }: { className?: string; onClick: any; text: string }) => (
    <li className={`dib pointer no-underline pointer white ${className}`} onClick={onClick}>
        {text}
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
            <header data-testid="header" className="bg-black pa1">
                <nav className="container">
                    <ul className="list flex justify-between pa0 sans-serif">
                        <span></span>

                        <span>
                            <HeaderLink onClick={() => login()} text="Login" />
                        </span>
                    </ul>
                </nav>
            </header>
        )
    }
)

export const AppHeader: React.FC = React.memo(
    (): JSX.Element => {
        const { logout } = useAuthFunctions()

        return (
            <Header>
                <span></span>

                <span>
                    <HeaderLink onClick={() => logout()} text="Logout" />
                </span>
            </Header>
        )
    }
)
