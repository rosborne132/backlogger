import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Badge } from './Badge'

describe('<Badge />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            name: 'Action',
            slug: 'action'
        }
    })

    test('renders badge', () => {
        const { queryByTestId } = render(<Badge {...defaultProps} />)

        expect(queryByTestId('badge')).toBeTruthy()
    })
})
