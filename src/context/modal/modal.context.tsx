import * as React from 'react'

import { Modal } from 'src/components/Elements'

type ModalContent = React.ReactNode | null

type initialValues = {
    closeModal: () => void
    modalIsShowing: boolean
    openModal: (content: React.ReactNode) => void
    modalContent: ModalContent
}

const initialValues = {
    closeModal: () => {},
    modalIsShowing: false,
    openModal: (content: React.ReactNode) => {},
    modalContent: null
}

export const ModalContext = React.createContext<initialValues>(initialValues)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalIsShowing, setModalIsShowing] = React.useState(false)
    const [modalContent, setModalContent] = React.useState<ModalContent>(null)

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
