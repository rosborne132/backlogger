import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Spinner } from './Spinner'

describe('<Header />', () => {
    afterEach(cleanup)

    test('renders header component', () => {
        const { queryByTestId } = render(<Spinner />)

        expect(queryByTestId('spinner')).toBeTruthy()
    })
})
