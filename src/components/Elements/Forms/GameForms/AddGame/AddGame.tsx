import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { GET_USER_CONSOLES } from 'src/pages/app/[id]'

import { UserGame } from 'src/types'

import { ConsoleSelect, Form, FormLoadingScreen, GameSuggestionInput } from 'src/components/Elements'

import { ModalContext } from 'src/context'

export const ADD_USER_GAME = gql`
    mutation addUserGame($game: UserGameInput) {
        addUserGame(game: $game) {
            console {
                id
                name
            }
            cover {
                url
            }
            id
            inBacklog
            name
        }
    }
`

export const AddGame: React.FC = React.memo(
    (): JSX.Element => {
        const [consoles, setConsoles] = React.useState([])
        const [selectedConsoleId, setSelectedConsoleId] = React.useState('')
        const [isLoading, setIsLoading] = React.useState(false)
        const { closeModal } = React.useContext(ModalContext)
        const [name, setName] = React.useState('')
        const { data } = useQuery(GET_USER_CONSOLES)
        const [addUserGame] = useMutation(ADD_USER_GAME, {
            refetchQueries: ['GetUserGames', 'GetGamesByConsoleId']
        })

        React.useEffect(() => {
            if (data !== undefined) {
                const filteredConsoles = data.getUserConsoles.map((userConsole: UserGame) => {
                    return {
                        value: userConsole.console.id,
                        label: userConsole.console.name,
                        slug: userConsole.console.slug
                    }
                })

                setConsoles(filteredConsoles)
            }
        }, [data])

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            const submitedConsole = consoles.find(({ value }: { value: string }) => value === selectedConsoleId)
            const { value, label, slug } = submitedConsole

            await addUserGame({
                variables: {
                    game: {
                        consoleId: value,
                        consoleName: label,
                        consoleSlug: slug,
                        name
                    }
                }
            })

            setIsLoading(false)
            closeModal()
        }

        const closeForm = (e: React.MouseEvent<HTMLButtonElement>): any => {
            e.preventDefault()
            setName('')
            setSelectedConsoleId('')
            closeModal()
        }

        if (!data) return <FormLoadingScreen />

        return (
            <Form
                closeForm={(e: React.MouseEvent<HTMLButtonElement>) => closeForm(e)}
                formId="gameForm"
                isLoading={isLoading}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
            >
                <GameSuggestionInput
                    labelText="Name: "
                    inputId="gameInput"
                    onChange={(value: string) => setName(value)}
                />

                <ConsoleSelect
                    inputId="consoleSelect"
                    labelText="Console: "
                    onChange={(value: string) => setSelectedConsoleId(value)}
                    options={consoles}
                />
            </Form>
        )
    }
)
