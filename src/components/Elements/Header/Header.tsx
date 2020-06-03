import * as React from 'react'
import Link from 'next/link'

import { useAuthFunctions } from 'src/lib/auth'
import { UserContext } from 'src/context'

export const Header: React.FC = React.memo(
    (): JSX.Element => {
        const { login, logout } = useAuthFunctions()
        const { user } = React.useContext(UserContext)
        const linkStyle = 'no-underline pointer white'

        return (
            <header data-testid="header" className="bg-black pa1">
                <nav className="container">
                    <ul className="list flex justify-between pa0 sans-serif">
                        {user !== null ? (
                            <span>
                                <li className="dib pointer">
                                    <Link href="/app">
                                        <a className={linkStyle}>Home</a>
                                    </Link>
                                </li>
                                <li className="dib pl4">
                                    <Link href="/about">
                                        <a className={linkStyle}>About</a>
                                    </Link>
                                </li>
                            </span>
                        ) : (
                            <span>
                                <li className="dib">
                                    <Link href="/">
                                        <a className={linkStyle}>Home</a>
                                    </Link>
                                </li>
                                <li className="dib pl4">
                                    <Link href="/about">
                                        <a className={linkStyle}>About</a>
                                    </Link>
                                </li>
                            </span>
                        )}

                        <span>
                            {user !== null ? (
                                <li className={`dib pointer ${linkStyle}`} onClick={() => logout()}>
                                    Logout
                                </li>
                            ) : (
                                <li className={`dib pointer ${linkStyle}`} onClick={() => login()}>
                                    Login
                                </li>
                            )}
                        </span>
                    </ul>
                </nav>
            </header>
        )
    }
)
