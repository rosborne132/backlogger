import * as React from 'react'

import { AppHeader } from 'src/components/Elements'
import { ConsoleNavbar } from './ConsoleNavbar/ConsoleNavbar'
import { Meta } from 'src/components/Utilities'

type AppLayoutProps = {
    children?: React.ReactNode
    consoles: any
    header: string
}

export const AppLayout: React.FC<AppLayoutProps> = React.memo(
    ({ children, consoles, header }: AppLayoutProps): JSX.Element => {
        return (
            <>
                <Meta />
                <AppHeader />
                <main data-testid="appLayout">
                    <header className="pv1 tc">
                        <h2>{header}</h2>
                    </header>

                    <ConsoleNavbar consoles={consoles} />

                    <section className="container">{children}</section>
                </main>
            </>
        )
    }
)
