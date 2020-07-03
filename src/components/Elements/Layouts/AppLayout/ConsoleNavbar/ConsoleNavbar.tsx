import * as React from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import upperFirst from 'lodash/upperFirst'

import { ConsoleForm, GameForm, Icon } from 'src/components/Elements'

import { ModalContext } from 'src/context'

import style from './ConsoleNavbar.module.css'

type ConsoleNavbarProps = {
    consoles: any[]
}

const navbarButtons = [
    {
        type: 'game',
        component: () => <GameForm />
    },
    {
        type: 'console',
        component: () => <ConsoleForm />
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
        closed: { opacity: 1, x: '-70%' }
    }

    React.useEffect(() => {
        const pageSelected = router.query.id != undefined ? router.query.id : ''
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
                <div className={style.consoleNavbar}>
                    <ul data-testid="consoleNavbar">
                        {navbarButtons.map(({ component, type }: { component: any; type: string }) => {
                            if (type === 'game' && !consoles.length) return false

                            return (
                                <li
                                    key={type}
                                    className={showTab === type ? style.consoleListItemSelect : style.consoleListItem}
                                    onClick={() => {
                                        setShowTab(type)
                                        openModal(component())
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
                            )
                        })}

                        <li
                            className={selected === '' ? style.consoleListItemSelect : style.consoleListItem}
                            onClick={() => router.push('/app')}
                        >
                            Backlog
                        </li>
                        {consoles.map(({ console: { id, name } }: { console: { id: string; name: string } }) => (
                            <li
                                key={id}
                                className={selected === id ? style.consoleListItemSelect : style.consoleListItem}
                                onClick={() => router.push('/app/[id]', `/app/${id}`)}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setIsShowing(!isShowing)}
                        style={{ background: 'none', boxShadow: 'none', outline: 'none' }}
                        className="bn pointer"
                    >
                        <div className={style.consoleButton} style={{ top: '60px', left: '20px' }}>
                            {isShowing ? '<' : '>'}
                        </div>
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
})
