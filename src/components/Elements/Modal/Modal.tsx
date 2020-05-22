import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Icon } from '@components/Elements'

type ModalProps = {
    children: React.ReactNode
    isShowing: boolean
    onClose: () => void
}

export const Modal: React.FC<ModalProps> = React.memo(
    ({ children, isShowing, onClose }: ModalProps): JSX.Element => {
        const variants = {
            open: { y: 0 },
            closed: { y: 50 }
        }

        return (
            <AnimatePresence>
                {isShowing && (
                    <motion.div
                        key="modal"
                        data-testid="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: '30%',
                            left: '55%',
                            transform: 'translate3d(-50%, -40%, 0)',
                            zIndex: 3
                        }}
                    >
                        <motion.div
                            className="bg-white black br4 pa2 shadow-2"
                            variants={variants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <header className="pa0 pv1 tr">
                                <span
                                    className="pa2 pointer"
                                    data-testid="closeButton"
                                    onClick={onClose}
                                    onKeyDown={onClose}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <Icon
                                        icon="closeAlt"
                                        size="m1"
                                        aria-hidden
                                    />
                                </span>
                            </header>

                            <div>{children}</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }
)
