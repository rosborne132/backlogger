import * as React from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import upperFirst from 'lodash/upperFirst'

import { AddConsole, AddGame, Icon } from 'src/components/Elements'

import { ModalContext } from 'src/context'

import styles from './ConsoleNavbar.module.css'

type ConsoleNavbarProps = {
    consoles: any[]
}

const navbarButtons = [
    {
        type: 'game',
        component: () => <AddGame />
    },
    {
        type: 'console',
        component: () => <AddConsole />
    }
]

export const ConsoleNavbar: React.FC<ConsoleNavbarProps> = React.memo(({ consoles }) => {
    const [isShowing, setIsShowing] = React.useState(true)
    const [selected, setSelected] = React.useState<string | string[]>('')
    const [showTab, setShowTab] = React.useState('')
    const { modalIsShowing, openModal } = React.useContext(ModalContext)
    const router = useRouter()
    const variants = {
        open: { opacity: 1, x: '0vw' },
        closed: { opacity: 1, x: '-75%' }
    }

    React.useEffect(() => {
        const pageSelected = router.query.id != undefined ? router.query.id : router.pathname.replace('/app', '')
        setSelected(pageSelected)
    }, [consoles])

    React.useEffect(() => {
        if (!modalIsShowing) setShowTab('')
    }, [modalIsShowing])

    return (
        <AnimatePresence>
            <motion.div
                style={{ position: 'fixed', top: '25%', zIndex: 4 }}
                animate={isShowing ? 'open' : 'closed'}
                variants={variants}
            >
                <div className={styles.consoleNavbar}>
                    <ul data-testid="consoleNavbar">
                        {navbarButtons.map(({ component, type }: { component: any; type: string }) => {
                            if (type === 'game' && !consoles.length) return false

                            return (
                                <li
                                    key={type}
                                    className={showTab === type ? styles.consoleListItemSelect : styles.consoleListItem}
                                    onClick={() => {
                                        setShowTab(type)
                                        openModal(component())
                                    }}
                                >
                                    <span
                                        style={{
                                            alignItems: 'center',
                                            display: 'inline-flex',
                                            flexWrap: 'wrap',
                                            gap: 12
                                        }}
                                    >
                                        <Icon
                                            icon="add"
                                            size="m1"
                                            style={{
                                                fill: showTab === type ? 'black' : 'white'
                                            }}
                                            aria-hidden
                                        />
                                        {upperFirst(type)}
                                    </span>
                                </li>
                            )
                        })}

                        <li
                            className={selected === '' ? styles.consoleListItemSelect : styles.consoleListItem}
                            onClick={() => router.push('/app')}
                        >
                            Collection
                        </li>

                        <li
                            className={selected === '/backlog' ? styles.consoleListItemSelect : styles.consoleListItem}
                            onClick={() => router.push('/app/backlog')}
                        >
                            Backlog
                        </li>

                        {consoles.map(({ console: { id, name } }: { console: { id: string; name: string } }) => (
                            <li
                                key={id}
                                className={selected === id ? styles.consoleListItemSelect : styles.consoleListItem}
                                onClick={() => router.push('/app/[id]', `/app/${id}`)}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setIsShowing(!isShowing)}
                        style={{ outline: 'none', boxShadow: 'none' }}
                        className={styles.consoleBackground}
                    >
                        <div className={styles.consoleButton}>{isShowing ? '<' : '>'}</div>
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
})
