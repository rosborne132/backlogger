import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { GET_USER_CONSOLES } from 'src/pages/app/[id]'

import { Button, ConsoleSelect, FormLoadingScreen, GameSuggestionInput } from 'src/components/Elements'

import { ModalContext } from 'src/context'

export const ADD_USER_GAME = gql`
    mutation addUserGame($game: UserGameInput) {
        addUserGame(game: $game) {
            id
            name
            inBacklog
            cover {
                url
            }
            console {
                id
                name
            }
        }
    }
`

export const GameForm: React.FC = React.memo(
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
                const filteredConsoles = data.getUserConsoles.map(userConsole => {
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
        }

        const closeForm = (e: React.MouseEvent<HTMLButtonElement>): any => {
            e.preventDefault()
            setName('')
            setSelectedConsoleId('')
            closeModal()
        }

        if (!data) return <FormLoadingScreen />

        return (
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)} data-testid="gameForm">
                <fieldset style={{ border: 'none' }}>
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

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => closeForm(e)}
                            className="cancel"
                            isLoading={isLoading}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" isLoading={isLoading}>
                            Submit
                        </Button>
                    </div>
                </fieldset>
            </form>
        )
    }
)