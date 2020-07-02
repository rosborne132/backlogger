import * as React from 'react'
import { LandingHeader } from 'src/components/Elements'
import { Meta } from 'src/components/Utilities'

export const LandingLayout: React.FC = React.memo(
    ({ children }: { children: React.ReactNode }): JSX.Element => (
        <>
            <Meta />
            <LandingHeader />
            <main data-testid="landingLayout" className="layout">
                {children}
            </main>
        </>
    )
)
