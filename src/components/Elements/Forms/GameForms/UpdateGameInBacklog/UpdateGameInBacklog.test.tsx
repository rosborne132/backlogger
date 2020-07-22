import * as React from 'react'
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import { UPDATE_USER_GAME } from 'src/lib/queries'
import { UpdateGameInBacklog } from './UpdateGameInBacklog'

describe('<UpdateGameInBacklog />', () => {
    afterEach(cleanup)

    test('remove game from backlog', async () => {
        let mutationCalled = false
        const mocks = [
            {
                request: {
                    query: UPDATE_USER_GAME,
                    variables: {
                        game: {
                            gameId: '1',
                            inBacklog: false
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
                    <UpdateGameInBacklog userGameId="1" inBacklog={false} />
                </MockedProvider>
            )

            expect(getByText('Cancel')).toBeTruthy()
            expect(getByText('Submit')).toBeTruthy()
            expect(queryByTestId('updateGameInBacklog')).toBeTruthy()

            fireEvent.click(getByText('Submit'))
            await new Promise(resolve => setTimeout(resolve, 0))

            expect(mutationCalled).toBe(true)
        })
    })

    test('remove game from backlog', async () => {
        let mutationCalled = false
        const mocks = [
            {
                request: {
                    query: UPDATE_USER_GAME,
                    variables: {
                        game: {
                            gameId: '1',
                            inBacklog: true
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
                    <UpdateGameInBacklog userGameId="1" inBacklog={true} />
                </MockedProvider>
            )

            expect(getByText('Cancel')).toBeTruthy()
            expect(getByText('Submit')).toBeTruthy()
            expect(queryByTestId('updateGameInBacklog')).toBeTruthy()

            fireEvent.click(getByText('Submit'))
            await new Promise(resolve => setTimeout(resolve, 0))

            expect(mutationCalled).toBe(true)
        })
    })
})
