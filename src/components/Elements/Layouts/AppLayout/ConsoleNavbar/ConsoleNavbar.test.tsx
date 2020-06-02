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
        const { queryByTestId, rerender } = render(<ConsoleNavbar {...defaultProps} />)

        expect(queryByTestId('consoleNavbar')).toBeTruthy()
        expect(queryByTestId('consoleNavbar').children.length).toBe(3)

        defaultProps.consoles = [{ console: { id: '1', name: 'Wii', slug: 'wii' } }]

        rerender(<ConsoleNavbar {...defaultProps} />)

        expect(queryByTestId('consoleNavbar')).toBeTruthy()
        expect(queryByTestId('consoleNavbar').children.length).toBe(4)
    })
})
