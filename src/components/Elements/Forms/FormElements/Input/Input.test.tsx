import * as React from 'react'
import { cleanup, render } from '@testing-library/react'

import { GameSuggestionInput } from './Input'

describe('<GameSuggestionInput />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            labelText: 'testInput',
            inputId: 'testInput',
            onChange: jest.fn()
        }
    })

    test('renders input with label', () => {
        const { getByText, queryByTestId } = render(<GameSuggestionInput {...defaultProps} />)

        expect(queryByTestId('testInput')).toBeTruthy()
        expect(getByText('testInput')).toBeTruthy()
    })

    test('renders input without label', () => {
        defaultProps.labelText = ''
        const { queryByText, queryByTestId } = render(<GameSuggestionInput {...defaultProps} />)

        expect(queryByTestId('testInput')).toBeTruthy()
        expect(queryByText('testInput')).not.toBeTruthy()
    })
})
