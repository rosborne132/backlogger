import * as React from 'react'
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import { DELETE_USER_GAME } from 'src/lib/queries'
import { RemoveFromCollection } from './RemoveFromCollection'

describe('<RemoveFromCollection />', () => {
    afterEach(cleanup)

    test('removes game from backlog', async () => {
        let mutationCalled = false
        const mocks = [
            {
                request: {
                    query: DELETE_USER_GAME,
                    variables: {
                        game: {
                            gameId: '1'
                        }
                    }
                },
                result: () => {
                    mutationCalled = true
                    return {
                        data: {
                            status: '200'
                        }
                    }
                }
            }
        ]

        await act(async () => {
            const { getByText, queryByTestId } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RemoveFromCollection userGameId="1" />
                </MockedProvider>
            )

            expect(getByText('Cancel')).toBeTruthy()
            expect(getByText('Submit')).toBeTruthy()
            expect(queryByTestId('removeFromCollection')).toBeTruthy()

            fireEvent.click(getByText('Submit'))
            await new Promise(resolve => setTimeout(resolve, 0))

            expect(mutationCalled).toBe(true)
        })
    })
})
