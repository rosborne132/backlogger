import * as React from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

import { ConsoleForm, GameForm, Icon } from 'src/components/Elements'

import { ModalContext } from 'src/context'

type AppLayoutProps = {
    consoles: any
}

export const ConsoleNavbar: React.FC<AppLayoutProps> = React.memo(
    ({ consoles }) => {
        const [isShowing, setIsShowing] = React.useState(true)
        const [selected, setSelected] = React.useState<string | string[]>('')
        const [showTab, setShowTab] = React.useState('')
        const { modalIsShowing, openModal } = React.useContext(ModalContext)
        const router = useRouter()
        const variants = {
            open: { opacity: 1, x: '0%' },
            closed: { opacity: 0, x: '-100%' }
        }

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
            <AnimatePresence>
                <div
                    className="flex flex-wrap"
                    style={{
                        position: 'fixed',
                        top: '5%',
                        left: '0',
                        width: '175px',
                        height: '100vh',
                        zIndex: 3
                    }}
                >
                    {isShowing && (
                        <motion.ul
                            className="list ml0 pl0 w4"
                            variants={variants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <li
                                className={`ba pointer pl2 pv3 ${
                                    showTab === 'game'
                                        ? 'bg-black white'
                                        : 'bg-white'
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
                                        : 'bg-white'
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
                                    selected === ''
                                        ? 'bg-black white'
                                        : 'bg-white'
                                }`}
                                onClick={() => router.push('/app')}
                            >
                                Backlog
                            </li>
                            {consoles.map(({ console: { id, name } }) => (
                                <li
                                    className={`ba pointer pl2 pv3 ${
                                        selected === id
                                            ? 'bg-black white'
                                            : 'bg-white'
                                    }`}
                                    key={id}
                                    onClick={() =>
                                        router.push('/app/[id]', `/app/${id}`)
                                    }
                                >
                                    {name}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                    <button
                        onClick={() => setIsShowing(!isShowing)}
                        style={{ background: 'none' }}
                        className="bn h-100 pointer"
                    >
                        <div className="bg-white pa2 br4">
                            {isShowing ? '<' : '>'}
                        </div>
                    </button>
                </div>
            </AnimatePresence>
        )
    }
)
