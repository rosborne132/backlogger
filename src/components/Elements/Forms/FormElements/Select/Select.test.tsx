import * as React from 'react'
import { cleanup, render } from '@testing-library/react'

import { ConsoleSelect } from './Select'

describe('<ConsoleSelect />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            labelText: 'testInput',
            inputId: 'testInput',
            onChange: jest.fn(),
            options: [
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' }
            ]
        }
    })

    test('renders ConsoleSelect with label', () => {
        const { getByText, queryByTestId } = render(<ConsoleSelect {...defaultProps} />)

        expect(queryByTestId('testInput')).toBeTruthy()
        expect(getByText('testInput')).toBeTruthy()
    })

    test('renders ConsoleSelect without label', () => {
        defaultProps.labelText = ''
        const { queryByText, queryByTestId } = render(<ConsoleSelect {...defaultProps} />)

        expect(queryByTestId('testInput')).toBeTruthy()
        expect(queryByText('testInput')).not.toBeTruthy()
    })
})
