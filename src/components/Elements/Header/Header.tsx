import * as React from 'react'
import { useRouter } from 'next/router'

import { useAuthFunctions } from 'src/lib/auth'
import { UserContext } from 'src/context'

const HeaderLink = ({ className, onClick, text }: { className?: string; onClick: any; text: string }) => (
    <li className={`dib pointer no-underline pointer white ${className}`} onClick={onClick}>
        {text}
    </li>
)

export const Header: React.FC = React.memo(
    (): JSX.Element => {
        const { login, logout } = useAuthFunctions()
        const { user } = React.useContext(UserContext)
        const router = useRouter()

        return (
            <header data-testid="header" className="bg-black pa1">
                <nav className="container">
                    <ul className="list flex justify-between pa0 sans-serif">
                        <span>
                            {user !== null ? (
                                <HeaderLink onClick={() => router.push('/app')} text="Home" />
                            ) : (
                                <HeaderLink onClick={() => router.push('/')} text="Home" />
                            )}

                            <HeaderLink className="pl4" onClick={() => router.push('/about')} text="About" />
                        </span>

                        <span>
                            {user !== null ? (
                                <HeaderLink onClick={() => logout()} text="Logout" />
                            ) : (
                                <HeaderLink onClick={() => login()} text="Login" />
                            )}
                        </span>
                    </ul>
                </nav>
            </header>
        )
    }
)
