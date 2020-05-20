import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { LoadingScreen } from './LoadingScreen'

describe('<LoadingScreen />', () => {
    afterEach(cleanup)

    test('renders loading screen', () => {
        const { queryByTestId } = render(<LoadingScreen />)

        expect(queryByTestId('loadingScreen')).toBeTruthy()
    })
})
