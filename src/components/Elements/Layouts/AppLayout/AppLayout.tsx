import * as React from 'react'

import { AppHeader } from 'src/components/Elements'
import { ConsoleNavbar } from './ConsoleNavbar/ConsoleNavbar'
import { Meta } from 'src/components/Utilities'

type AppLayoutProps = {
    children?: React.ReactNode
    consoles?: any[]
    displayNav?: boolean
    header?: string
}

export const AppLayout: React.FC<AppLayoutProps> = React.memo(
    ({ children, consoles = [], displayNav = true, header }: AppLayoutProps): JSX.Element => {
        return (
            <>
                <Meta />
                <AppHeader />
                <main data-testid="appLayout">
                    {header?.length ? (
                        <header className="pv1 tc">
                            <h2>{header}</h2>
                        </header>
                    ) : null}

                    {displayNav ? <ConsoleNavbar consoles={consoles} /> : null}

                    <section className="container">{children}</section>
                </main>
            </>
        )
    }
)
