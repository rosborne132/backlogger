import * as React from 'react'
import { useRouter } from 'next/router'

import { useAuthFunctions } from 'src/lib/auth'
import styles from './Header.module.css'

export const LandingHeader: React.FC = React.memo(
    (): React.ReactNode => {
        const router = useRouter()
        const { login } = useAuthFunctions()

        return (
            <header data-testid="header" className={styles.header}>
                <h1 className="logo">
                    <a onClick={() => router.push({ pathname: `/` })}>Backlogger</a>
                </h1>
                <nav>
                    <a onClick={() => login()}>Login</a>
                </nav>
            </header>
        )
    }
)

export const AppHeader: React.FC = React.memo(
    (): React.ReactNode => {
        const router = useRouter()
        const { logout } = useAuthFunctions()

        return (
            <header data-testid="header" className={styles.header}>
                <h1 className="logo">
                    <a onClick={() => router.push({ pathname: `/app` })}>Backlogger</a>
                </h1>
                <nav>
                    <a onClick={() => logout()}>Logout</a>
                </nav>
            </header>
        )
    }
)
