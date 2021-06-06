import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { AppLayout } from './AppLayout'

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

describe('<AppLayout />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            consoles: [],
            header: 'Test Header'
        }
    })

    test('renders landing layout', () => {
        const { getByText, queryByTestId } = render(
            <AppLayout {...defaultProps}>
                <h1>Hello</h1>
            </AppLayout>
        )

        expect(queryByTestId('appLayout')).toBeTruthy()
        expect(getByText('Hello')).toBeTruthy()
    })
})
