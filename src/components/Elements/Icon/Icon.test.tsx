import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Icon } from './Icon'

describe('<Icon />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            icon: 'closeAlt',
            size: 'm1'
        }
    })

    test('renders icon', () => {
        const { queryByTestId } = render(<Icon {...defaultProps} />)

        expect(queryByTestId('icon')).toBeTruthy()
    })
})
