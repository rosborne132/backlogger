import * as React from 'react'
import { cleanup, render } from '@testing-library/react'

import { ButtonGroup } from './ButtonGroup'

describe('<ButtonGroup />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            isLoading: false,
            onClick: jest.fn()
        }
    })

    test('renders button group component', () => {
        const { getByText, queryByTestId } = render(<ButtonGroup {...defaultProps} />)

        expect(queryByTestId('buttonGroup')).toBeTruthy()
        expect(getByText('Cancel')).toBeTruthy()
        expect(getByText('Submit')).toBeTruthy()
    })
})
