import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Header } from './Header'

describe('<Header />', () => {
    afterEach(cleanup)

    test('renders header component', () => {
        const { queryByTestId } = render(<Header />)

        expect(queryByTestId('header')).toBeTruthy()
    })
})
