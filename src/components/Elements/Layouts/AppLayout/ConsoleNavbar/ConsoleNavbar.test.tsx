import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { ConsoleNavbar } from './ConsoleNavbar'

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/app',
            pathname: '',
            query: '1',
            asPath: ''
        }
    }
}))

describe('<ConsoleNavbar />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            consoles: []
        }
    })

    test('renders consoleNavbar', () => {
        const { queryByTestId, queryByText, rerender } = render(<ConsoleNavbar {...defaultProps} />)

        expect(queryByText('Console')).toBeTruthy()
        expect(queryByText('Game')).not.toBeTruthy()
        expect(queryByTestId('consoleNavbar')).toBeTruthy()
        expect(queryByTestId('consoleNavbar').children.length).toBe(2)

        defaultProps.consoles = [{ console: { id: '1', name: 'Wii', slug: 'wii' } }]

        rerender(<ConsoleNavbar {...defaultProps} />)

        expect(queryByText('Console')).toBeTruthy()
        expect(queryByText('Game')).toBeTruthy()
        expect(queryByTestId('consoleNavbar')).toBeTruthy()
        expect(queryByTestId('consoleNavbar').children.length).toBe(4)
    })
})
