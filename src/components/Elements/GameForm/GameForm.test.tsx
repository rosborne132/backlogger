import * as React from 'react'
import { act, cleanup, render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import { GameForm } from './GameForm'

describe('<GameForm />', () => {
    afterEach(cleanup)

    test('renders loading screen', async () => {
        await act(async () => {
            const { queryByTestId } = render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <GameForm />
                </MockedProvider>
            )
            await waitFor(() => {
                expect(queryByTestId('loadingScreen')).toBeTruthy()
            })
        })
    })
})
