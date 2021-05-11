import * as React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Form } from './Form'

describe('<Form />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            closeForm: jest.fn(),
            formId: 'testForm',
            isLoading: false,
            onSubmit: jest.fn()
        }
    })

    test('renders form component', () => {
        const { getByText, queryByTestId } = render(
            <Form {...defaultProps}>
                <p>Would you like to remove this game from your collection?</p>
            </Form>
        )

        expect(queryByTestId('testForm')).toBeTruthy()
        expect(getByText('Would you like to remove this game from your collection?')).toBeTruthy()
    })
})
