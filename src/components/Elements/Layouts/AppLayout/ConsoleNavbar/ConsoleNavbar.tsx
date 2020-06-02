import * as React from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

import { ConsoleForm, GameForm, Icon } from 'src/components/Elements'
import { Platform as Console } from 'src/types'

import { ModalContext } from 'src/context'

type ConsoleNavbarProps = {
    consoles: Console[]
}

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
            <div className="fixed flex flex-wrap left-0 top-0 vh-100 w5 z-3">
                {isShowing && (
                    <motion.ul
                        className="h-50 list ml0 overflow-scroll pl0 relative top-25 w4-5"
                        variants={variants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        data-testid="consoleNavbar"
                    >
                        <li
                            className={`${linkStyle} ${showTab === 'game' ? 'bg-black white' : 'bg-white'}`}
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
                                        fill: showTab === 'game' ? 'white' : 'black'
                                    }}
                                    aria-hidden
                                />{' '}
                                Game
                            </span>
                        </li>
                        <li
                            className={`${linkStyle} ${showTab === 'console' ? 'bg-black white' : 'bg-white'}`}
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
                                        fill: showTab === 'console' ? 'white' : 'black'
                                    }}
                                    aria-hidden
                                />{' '}
                                Console
                            </span>
                        </li>
                        <li
                            className={`${linkStyle} ${selected === '' ? 'bg-black white' : 'bg-white'}`}
                            onClick={() => router.push('/app')}
                        >
                            Backlog
                        </li>
                        {consoles.map(({ console: { id, name } }: { console: { id: string; name: string } }) => (
                            <li
                                className={`${linkStyle} ${selected === id ? 'bg-black white' : 'bg-white'}`}
                                key={id}
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
