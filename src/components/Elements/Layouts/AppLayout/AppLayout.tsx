import * as React from 'react'
import Slider from 'react-slick'

import { AppHeader } from 'src/components/Elements'
import { ConsoleNavbar } from './ConsoleNavbar/ConsoleNavbar'
import { Meta } from 'src/components/Utilities'

type AppLayoutProps = {
    children?: React.ReactNode
    consoles?: any[]
    displayNav?: boolean
    header?: string
    images?: any
}

const settings = {
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
}

const renderScreenshots = (screenshots: any) =>
    screenshots.map(({ id, url }: { id: string; url: string }) => (
        <div key={id}>
            <img src={url.replace('t_thumb', 't_1080p')} />
        </div>
    ))

export const AppLayout: React.FC<AppLayoutProps> = React.memo(
    ({ children, consoles = [], displayNav = true, images = [], header }: AppLayoutProps): JSX.Element => {
        return (
            <>
                <Meta />
                <AppHeader />
                <main data-testid="appLayout">
                    {header?.length ? (
                        <header className="tc">
                            <h2>{header}</h2>
                        </header>
                    ) : null}

                    {images?.length ? <Slider {...settings}>{renderScreenshots(images)}</Slider> : null}

                    {displayNav ? <ConsoleNavbar consoles={consoles} /> : null}

                    <section className="layout">{children}</section>
                </main>
            </>
        )
    }
)
