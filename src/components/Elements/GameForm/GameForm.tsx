import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { GET_USER_CONSOLES } from 'src/pages/app/[id]'

import { Button, FormLoadingScreen } from 'src/components/Elements'

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
        const [name, setName] = React.useState('')
        const { data } = useQuery(GET_USER_CONSOLES)
        const [addUserGame] = useMutation(ADD_USER_GAME, {
            refetchQueries: ['GetUserGames', 'GetGamesByConsoleId']
        })

        React.useEffect(() => {
            if (data !== undefined) {
                setConsoles(data.getUserConsoles)
                setSelectedConsoleId(data.getUserConsoles[0].console.id)
            }
        }, [data])

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            const submitedConsole = consoles.find(
                ({ console: { id } }: { console: { id: string } }) => id === selectedConsoleId
            )

            await addUserGame({
                variables: {
                    game: {
                        consoleId: submitedConsole.console.id,
                        consoleName: submitedConsole.console.name,
                        consoleSlug: submitedConsole.console.slug,
                        name
                    }
                }
            })

            setIsLoading(false)
        }

        if (!data) return <FormLoadingScreen />

        return (
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)} data-testid="gameForm">
                <fieldset className="bn">
                    <div className="pv2">
                        <label htmlFor="gameInput" className="db f4">
                            Name:
                        </label>
                        <input
                            id="gameInput"
                            data-testid="gameInput"
                            className="ba b--light-white br3 f4 indent h2 mv3 w-100"
                            type="text"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                    </div>

                    <div className="pv2">
                        <label htmlFor="consoleSelect" className="db f4">
                            Console:
                        </label>
                        <select
                            name="consoleSelect"
                            id="consoleSelect"
                            data-testid="consoleSelect"
                            className="ba b--black br3 h2 mv3 w-100"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedConsoleId(e.target.value)}
                        >
                            {consoles.map(({ console: { id, name } }: { console: { id: string; name: string } }) => (
                                <option className="overflow-scroll" key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" isLoading={isLoading}>
                        Submit
                    </Button>
                </fieldset>
            </form>
        )
    }
)
