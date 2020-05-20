import React from 'react'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'

import { Modal } from './Modal'

describe('<Modal />', () => {
    afterEach(cleanup)
    let defaultProps: any

    beforeEach(() => {
        const onClose = jest.fn(() => {
            defaultProps.isShowing = false
        })

        defaultProps = {
            isShowing: true,
            onClose
        }
    })

    test('renders opened modal', () => {
        const { queryByTestId } = render(
            <Modal {...defaultProps}>
                <div>Opened Modal</div>
            </Modal>
        )

        expect(queryByTestId('modal')).toBeTruthy()
    })

    test('allows user to close out the modal', async () => {
        const { getByTestId, queryByTestId, rerender } = render(
            <Modal {...defaultProps}>
                <div>Opened Modal</div>
            </Modal>
        )

        const closeButton = getByTestId('closeButton')

        fireEvent.click(closeButton)

        rerender(
            <Modal onClose={defaultProps.onClose} isShowing={false}>
                <div>Closed Modal</div>
            </Modal>
        )

        await waitFor(() => {
            expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
            expect(queryByTestId('modal')).toBeFalsy()
        })
    })
})
