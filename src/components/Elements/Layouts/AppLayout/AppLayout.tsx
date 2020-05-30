import * as React from 'react'
import { useRouter } from 'next/router'

import { ConsoleForm, GameForm, Header, Icon } from 'src/components/Elements'

import { Meta } from 'src/components/Utilities'
import { ModalContext } from 'src/context'

type AppLayoutProps = {
    children?: React.ReactNode
    consoles: any
}

export const AppLayout: React.FC<AppLayoutProps> = React.memo(
    ({ children, consoles }: AppLayoutProps): JSX.Element => {
        const [selected, setSelected] = React.useState<string | string[]>('')
        const [showTab, setShowTab] = React.useState('')
        const { modalIsShowing, openModal } = React.useContext(ModalContext)
        const router = useRouter()

        React.useEffect(() => {
            const pageSelected =
                router.query.id != undefined ? router.query.id : ''
            setSelected(pageSelected)
        }, [consoles])

        React.useEffect(() => {
            if (!modalIsShowing) {
                setShowTab('')
            }
        }, [modalIsShowing])

        return (
            <>
                <Meta />
                <Header />
                <main>
                    <div className="flex">
                        <ul className="list ml0 pl0 w-10">
                            <li
                                className={`ba pointer pl2 pv3 ${
                                    showTab === 'game' ? 'bg-black white' : ''
                                }`}
                                onClick={() => {
                                    setShowTab('game')
                                    openModal(<GameForm />)
                                }}
                            >
                                <span>
                                    <Icon
                                        icon="add"
                                        size="m1"
                                        style={{
                                            fill:
                                                showTab === 'game'
                                                    ? 'white'
                                                    : 'black'
                                        }}
                                        aria-hidden
                                    />{' '}
                                    Game
                                </span>
                            </li>
                            <li
                                className={`ba pointer pl2 pv3 ${
                                    showTab === 'console'
                                        ? 'bg-black white'
                                        : ''
                                }`}
                                onClick={() => {
                                    setShowTab('console')
                                    openModal(<ConsoleForm />)
                                }}
                            >
                                <span>
                                    <Icon
                                        icon="add"
                                        size="m1"
                                        style={{
                                            fill:
                                                showTab === 'console'
                                                    ? 'white'
                                                    : 'black'
                                        }}
                                        aria-hidden
                                    />{' '}
                                    Console
                                </span>
                            </li>
                            <li
                                className={`ba pointer pl2 pv3 ${
                                    selected === '' ? 'bg-black white' : ''
                                }`}
                                onClick={() => router.push('/app')}
                            >
                                Backlog
                            </li>
                            {consoles.map(({ console: { id, name } }) => (
                                <li
                                    className={`ba pointer pl2 pv3 ${
                                        selected === id ? 'bg-black white' : ''
                                    }`}
                                    key={id}
                                    onClick={() =>
                                        router.push('/app/[id]', `/app/${id}`)
                                    }
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>

                        <section className="flex justify-center w-90">
                            <div>{children}</div>
                        </section>
                    </div>
                </main>
            </>
        )
    }
)
