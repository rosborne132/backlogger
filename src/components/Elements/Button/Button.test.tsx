import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { Button } from './Button'

describe('<Button />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            isLoading: false,
            onClick: () => console.log('This is a test')
        }
    })

    test('renders button component', () => {
        const { queryByTestId } = render(
            <Button {...defaultProps}>Test Button</Button>
        )

        expect(queryByTestId('button')).toBeTruthy()
    })

    test('button is disabled', () => {
        const { queryByTestId } = render(
            <Button {...defaultProps} isDisabled>
                Disabled Button
            </Button>
        )

        expect(queryByTestId('button')).isDisabled
    })

    test('button is loading', () => {
        const { queryByTestId } = render(
            <Button {...defaultProps} isLoading={true}>
                Loading Button
            </Button>
        )

        expect(queryByTestId('button')).isDisabled
    })
})
