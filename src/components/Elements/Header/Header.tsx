import * as React from 'react'
import { useRouter } from 'next/router'

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

// const Header = ({ children }: { children: React.ReactNode }) => (
//     <header data-testid="header" className="bg-black pa1">
//         <nav className="container">
//             <ul className="list flex justify-between pa0 sans-serif">{children}</ul>
//         </nav>
//     </header>
// )

const Header = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    return (
        <header data-testid="header">
            <h1 className="fake-logo">
                <a onClick={() => router.push({ pathname: `/app` })}>Backlogger</a>
            </h1>
            <nav>{children}</nav>
        </header>
    )
}

export const LandingHeader: React.FC = React.memo(
    (): JSX.Element => {
        const { login } = useAuthFunctions()

        return (
            <Header>
                <a onClick={() => login()}>Login</a>
            </Header>
        )
    }
)

export const AppHeader: React.FC = React.memo(
    (): JSX.Element => {
        const { logout } = useAuthFunctions()

        return (
            <Header>
                <a onClick={() => logout()}>Logout</a>
            </Header>
        )
    }
)
