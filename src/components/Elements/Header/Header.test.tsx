import * as React from 'react'
import { cleanup, render } from '@testing-library/react'

import { UserContextWrapper } from 'src/context/helpers'
import { Header } from './Header'

describe('<Header />', () => {
    afterEach(cleanup)

    beforeEach(() => {})

    test('renders header', () => {
        const { getByText, queryByTestId } = render(<Header />)

        expect(queryByTestId('header')).toBeTruthy()
        expect(getByText('Home')).toBeTruthy()
        expect(getByText('About')).toBeTruthy()
        expect(getByText('Login')).toBeTruthy()
    })

    test('displays in app header links', () => {
        const { getByText } = render(
            <UserContextWrapper>
                <Header />
            </UserContextWrapper>
        )

        expect(getByText('Games')).toBeTruthy()
        expect(getByText('App')).toBeTruthy()
        expect(getByText('Logout')).toBeTruthy()
    })
})
