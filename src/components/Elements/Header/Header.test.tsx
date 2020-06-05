import * as React from 'react'
import { cleanup, render } from '@testing-library/react'

import { AppHeader, LandingHeader } from './Header'

describe('Headers', () => {
    afterEach(cleanup)

    test('renders <AppHeader/>', () => {
        const { getByText, queryByTestId } = render(<AppHeader />)

        expect(queryByTestId('header')).toBeTruthy()
        expect(getByText('Home')).toBeTruthy()
        expect(getByText('Logout')).toBeTruthy()
    })

    test('renders <LandingHeader/>', () => {
        const { getByText } = render(<LandingHeader />)

        expect(getByText('Home')).toBeTruthy()
        expect(getByText('About')).toBeTruthy()
        expect(getByText('Login')).toBeTruthy()
    })
})
