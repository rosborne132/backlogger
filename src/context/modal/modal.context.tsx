import * as React from 'react'

import { Modal } from '@components/Elements'

const defaultValues = {
    closeModal: () => {},
    modalIsShowing: false,
    openModal: content => {},
    modalContent: null
}

export const ModalContext = React.createContext(defaultValues)

export const ModalProvider = ({ children }) => {
    let [modalIsShowing, setModalIsShowing] = React.useState(false)
    let [modalContent, setModalContent] = React.useState<React.ReactNode>(null)

    const openModal = (content: React.ReactNode) => {
        setModalIsShowing(true)
        setModalContent(content)
    }

    const closeModal = () => {
        setModalIsShowing(false)
        setModalContent(null)
    }

    return (
        <ModalContext.Provider
            value={{
                closeModal,
                modalIsShowing,
                modalContent,
                openModal
            }}
        >
            <Modal isShowing={modalIsShowing} onClose={closeModal}>
                {modalContent}
            </Modal>

            {children}
        </ModalContext.Provider>
    )
}
