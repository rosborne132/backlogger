import * as React from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import upperFirst from 'lodash/upperFirst'

import { ConsoleForm, GameForm, Icon } from 'src/components/Elements'
import { UserConsole } from 'src/types'

import { ModalContext } from 'src/context'

type ConsoleNavbarProps = {
    consoles: UserConsole[]
}

const navbarButtons = [
    {
        type: 'game',
        component: <GameForm />
    },
    {
        type: 'console',
        component: <ConsoleForm />
    }
]

export const ConsoleNavbar: React.FC<ConsoleNavbarProps> = React.memo(({ consoles }) => {
    const [isShowing, setIsShowing] = React.useState(true)
    const [selected, setSelected] = React.useState<string | string[]>('')
    const [showTab, setShowTab] = React.useState('')
    const { modalIsShowing, openModal } = React.useContext(ModalContext)
    const router = useRouter()
    const variants = {
        open: { opacity: 1, x: '0%' },
        closed: { opacity: 0, x: '-100%' }
    }
    const linkStyle = 'ba pointer pl2 pv3'

    React.useEffect(() => {
        const pageSelected = router.query.id != undefined ? router.query.id : ''
        setSelected(pageSelected)
    }, [consoles])

    React.useEffect(() => {
        if (!modalIsShowing) {
            setShowTab('')
        }
    }, [modalIsShowing])

    return (
        <AnimatePresence>
            <div className="fixed flex  top-25 vh-50  w5 z-3">
                {isShowing && (
                    <motion.ul
                        className="h-100 list ml0 overflow-auto pl0 relative w4-5"
                        variants={variants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        data-testid="consoleNavbar"
                    >
                        {navbarButtons.map(({ component, type }: { component: JSX.Element; type: string }) => (
                            <li
                                key={type}
                                className={`${linkStyle} ${showTab === type ? 'bg-black white' : 'bg-white'}`}
                                onClick={() => {
                                    setShowTab(type)
                                    openModal(component)
                                }}
                            >
                                <span>
                                    <Icon
                                        icon="add"
                                        size="m1"
                                        style={{
                                            fill: showTab === type ? 'white' : 'black'
                                        }}
                                        aria-hidden
                                    />
                                    {` ${upperFirst(type)}`}
                                </span>
                            </li>
                        ))}

                        <li
                            className={`${linkStyle} ${selected === '' ? 'bg-black white' : 'bg-white'}`}
                            onClick={() => router.push('/app')}
                        >
                            Backlog
                        </li>
                        {consoles.map(({ console: { id, name } }: { console: { id: string; name: string } }) => (
                            <li
                                key={id}
                                className={`${linkStyle} ${selected === id ? 'bg-black white' : 'bg-white'}`}
                                onClick={() => router.push('/app/[id]', `/app/${id}`)}
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
                    <div className="bg-white br4 pa2 pointer">{isShowing ? '<' : '>'}</div>
                </button>
            </div>
        </AnimatePresence>
    )
})
