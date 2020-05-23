import * as React from 'react'
import { Header } from 'src/components/Elements'
import { Meta } from 'src/components/Utilities'

export const Layout: React.FC = React.memo(
    ({ children }: { children: React.ReactNode }): JSX.Element => (
        <>
            <Meta />
            <Header />
            <main>
                <div className="container">{children}</div>
            </main>
        </>
    )
)
