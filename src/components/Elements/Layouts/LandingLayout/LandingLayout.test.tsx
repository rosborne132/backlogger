import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { LandingLayout } from './LandingLayout'

describe('<LandingLayout />', () => {
    afterEach(cleanup)

    test('renders landing layout', () => {
        const { getByText, queryByTestId } = render(
            <LandingLayout>
                <h1>Hello</h1>
            </LandingLayout>
        )

        expect(queryByTestId('landingLayout')).toBeTruthy()
        expect(getByText('Hello')).toBeTruthy()
    })
})
