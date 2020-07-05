import * as React from 'react'
import { cleanup, render } from '@testing-library/react'

import { ConsoleSelect } from './Select'

xdescribe('<ConsoleSelect />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            labelText: 'testInput',
            inputId: 'testInput',
            onChange: jest.fn()
        }
    })

    test('renders ConsoleSelect with label', () => {
        const { getByText, queryByTestId } = render(
            <ConsoleSelect {...defaultProps}>
                <option className="overflow-scroll" value="val1">
                    val1
                </option>
            </ConsoleSelect>
        )

        expect(queryByTestId('testInput')).toBeTruthy()
        expect(getByText('testInput')).toBeTruthy()
    })

    test('renders ConsoleSelect without label', () => {
        defaultProps.labelText = ''
        const { queryByText, queryByTestId } = render(
            <ConsoleSelect {...defaultProps}>
                <option className="overflow-scroll" value="val1">
                    val1
                </option>
            </ConsoleSelect>
        )

        expect(queryByTestId('testInput')).toBeTruthy()
        expect(queryByText('testInput')).not.toBeTruthy()
    })

    test('renders ConsoleSelect with options', () => {
        defaultProps.labelText = ''
        const { getByTestId } = render(
            <ConsoleSelect {...defaultProps}>
                <option className="overflow-scroll" value="val1">
                    val1
                </option>
                <option className="overflow-scroll" value="val2">
                    val2
                </option>
                <option className="overflow-scroll" value="val3">
                    val3
                </option>
            </ConsoleSelect>
        )

        expect(getByTestId('testInput')).toBeTruthy()
        expect(getByTestId('testInput').children.length).toBe(3)
    })
})
