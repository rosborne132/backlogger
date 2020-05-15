import * as React from 'react'
import Link from 'next/link'

export const Header: React.FC = React.memo(
    (): JSX.Element => {
        const linkStyle = 'no-underline white'
        return (
            <header className="bg-black pa1">
                <nav className="container">
                    <ul className="list flex justify-between pa0 sans-serif">
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
                        <span>
                            <li className="dib">
                                <Link href="/games">
                                    <a className={linkStyle}>Games</a>
                                </Link>
                            </li>
                            <li className="dib pl4">
                                <Link href="/app">
                                    <a className={linkStyle}>App</a>
                                </Link>
                            </li>
                        </span>
                    </ul>
                </nav>
            </header>
        )
    }
)
