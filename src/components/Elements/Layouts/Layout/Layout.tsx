import * as React from 'react'
import { Header } from '../../Header/Header'
import { Meta } from '../../../Utilities'

export const Layout: React.FC = React.memo(
    ({ children }): JSX.Element => (
        <>
            <Meta />
            <Header />
            <main>
                <div className="container">{children}</div>
            </main>
        </>
    )
)
