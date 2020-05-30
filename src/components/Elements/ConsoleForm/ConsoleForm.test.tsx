import * as React from 'react'
import {
    act,
    cleanup,
    fireEvent,
    render,
    waitFor
} from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import { GET_USER_CONSOLES } from 'src/pages/app/[id]'
import { ADD_USER_CONSOLE, ConsoleForm, GET_CONSOLES } from './ConsoleForm'

describe('<ConsoleForm />', () => {
    afterEach(cleanup)

    test('renders loading screen', async () => {
        await act(async () => {
            const { queryByTestId } = render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <ConsoleForm />
                </MockedProvider>
            )

            await waitFor(() => {
                expect(queryByTestId('loadingScreen')).toBeTruthy()
            })
        })
    })

    test('renders form', async () => {
        const mocks = [
            {
                request: {
                    query: GET_CONSOLES
                },
                result: () => {
                    return {
                        data: {
                            getConsoles: [
                                {
                                    id: '169',
                                    name: 'Xbox Series X',
                                    slug: 'xbox-series-x'
                                },
                                {
                                    id: '5',
                                    name: 'Wii',
                                    slug: 'wii'
                                },
                                {
                                    id: '24',
                                    name: 'Game Boy Advance',
                                    slug: 'gba'
                                }
                            ]
                        }
                    }
                }
            },
            {
                request: {
                    query: GET_USER_CONSOLES
                },
                result: () => {
                    return {
                        getUserConsoles: {
                            getUserConsoles: []
                        }
                    }
                }
            }
        ]

        await act(async () => {
            const { getByTestId, queryByTestId } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ConsoleForm />
                </MockedProvider>
            )

            await waitFor(() => {
                const consoleSelect = getByTestId('consoleSelect')

                expect(consoleSelect.childElementCount).toBe(3)
                expect(queryByTestId('consoleForm')).toBeTruthy()
            })
        })
    })

    test('submits console form', async () => {
        let deleteMutationCalled = false
        const mocks = [
            {
                request: {
                    query: GET_CONSOLES
                },
                result: () => {
                    return {
                        data: {
                            getConsoles: [
                                {
                                    id: '169',
                                    name: 'Xbox Series X',
                                    slug: 'xbox-series-x'
                                },
                                {
                                    id: '5',
                                    name: 'Wii',
                                    slug: 'wii'
                                },
                                {
                                    id: '24',
                                    name: 'Game Boy Advance',
                                    slug: 'gba'
                                }
                            ]
                        }
                    }
                }
            },
            {
                request: {
                    query: ADD_USER_CONSOLE,
                    variables: {
                        console: {
                            id: '169',
                            name: 'Xbox Series X',
                            slug: 'xbox-series-x'
                        }
                    }
                },
                result: () => {
                    deleteMutationCalled = true
                    return {
                        data: {
                            addUserConsole: {
                                id: '169',
                                name: 'Xbox Series X',
                                slug: 'xbox-series-x'
                            }
                        }
                    }
                }
            }
        ]

        await act(async () => {
            const { getByTestId, getByText } = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ConsoleForm />
                </MockedProvider>
            )

            await waitFor(() => {
                expect(getByText('Console:')).toBeTruthy()

                fireEvent.change(getByTestId('consoleSelect'), {
                    target: { value: '169' }
                })

                //fireEvent.click(getByTestId('button'))
            })
        })
    })
})
