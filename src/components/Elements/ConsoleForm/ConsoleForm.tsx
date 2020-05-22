import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PacmanLoader from 'react-spinners/PacmanLoader'

import { Button } from '@components/Elements'

const GET_CONSOLES = gql`
    query GetConsoles {
        getConsoles {
            id
            name
            slug
        }
    }
`

const ADD_USER_CONSOLE = gql`
    mutation addUserConsole($console: UserConsoleInput) {
        addUserConsole(console: $console) {
            id
            name
            slug
        }
    }
`

export const ConsoleForm: React.FC = React.memo(
    (): JSX.Element => {
        const [consoles, setConsoles] = React.useState([])
        const [selectedConsole, setSelectedConsole] = React.useState({})
        const [isLoading, setIsLoading] = React.useState(false)
        const { data, loading } = useQuery(GET_CONSOLES)

        const [addUserConsole] = useMutation(ADD_USER_CONSOLE)

        React.useEffect(() => {
            if (data !== undefined) {
                setConsoles(data.getConsoles)
                setSelectedConsole(data.getConsoles[0].id)
            }
        }, [data])

        const onSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
            e.preventDefault()
            setIsLoading(true)

            const submitedConsole = consoles.find(
                ({ id }: { id: string }) => id === selectedConsole
            )
            const { id, name, slug } = submitedConsole

            addUserConsole({ variables: { console: { id, name, slug } } })

            setIsLoading(false)
        }

        if (loading) {
            return (
                <div className="h4 w5">
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '40%',
                            transform: 'translate3d(-50%, -40%, 0)',
                            zIndex: 3
                        }}
                    >
                        <PacmanLoader />
                    </div>
                </div>
            )
        }

        return (
            <form onSubmit={onSubmit}>
                <fieldset className="bn">
                    <label htmlFor="consoleSelect" className="db f4">
                        Console:
                    </label>
                    <select
                        name="consoleSelect"
                        id="consoleSelect"
                        className="ba b--black h2 mv3"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setSelectedConsole(e.target.value)
                        }
                    >
                        {consoles.map(
                            ({ id, name }: { id: string; name: string }) => (
                                <option
                                    className="overflow-scroll"
                                    key={id}
                                    value={id}
                                >
                                    {name}
                                </option>
                            )
                        )}
                    </select>

                    <Button type="submit" isLoading={isLoading}>
                        Submit
                    </Button>
                </fieldset>
            </form>
        )
    }
)
