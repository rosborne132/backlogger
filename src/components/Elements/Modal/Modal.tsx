import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Icon } from 'src/components/Elements'
import styles from './Modal.module.css'

type ModalProps = {
    children: React.ReactNode
    isShowing: boolean
    onClose: () => void
}

export const Modal: React.FC = React.memo(
    ({ children, isShowing, onClose }: ModalProps): React.ReactNode => {
        const variants = {
            open: { y: 0 },
            closed: { y: 50 }
        }

        return (
            <AnimatePresence>
                {isShowing && (
                    <motion.div
                        className={styles.modalBackground}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            data-testid="modal"
                            className={styles.modal}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className={styles.modalBody}
                                variants={variants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <header>
                                    <span
                                        data-testid="closeButton"
                                        onClick={onClose}
                                        onKeyDown={onClose}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <Icon icon="closeAlt" size="m1" aria-hidden />
                                    </span>
                                </header>

                                <div>{children}</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        )
    }
)
