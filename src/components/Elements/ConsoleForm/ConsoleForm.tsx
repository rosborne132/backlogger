import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Button, ConsoleSelect, FormLoadingScreen } from 'src/components/Elements'

export const GET_CONSOLES = gql`
    query GetConsoles {
        getConsoles {
            id
            name
            slug
        }
    }
`

export const ADD_USER_CONSOLE = gql`
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
        const { data } = useQuery(GET_CONSOLES)
        const [addUserConsole] = useMutation(ADD_USER_CONSOLE, {
            refetchQueries: ['GetConsoles', 'GetUserConsoles']
        })

        React.useEffect(() => {
            if (data !== undefined) {
                setConsoles(data.getConsoles)
                setSelectedConsole(data.getConsoles[0].id)
            }
        }, [data])

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            const submitedConsole = consoles.find(({ id }: { id: string }) => id === selectedConsole)
            const { id, name, slug } = submitedConsole

            await addUserConsole({
                variables: { console: { id, name, slug } }
            })

            setIsLoading(false)
        }

        if (!data) return <FormLoadingScreen />

        return (
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)} data-testid="consoleForm">
                <fieldset className="bn">
                    <div className="pv2">
                        <ConsoleSelect
                            inputId="consoleSelect"
                            labelText="Console: "
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedConsole(e.target.value)}
                        >
                            {consoles.map(({ id, name }: { id: string; name: string }) => (
                                <option className="overflow-scroll" key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </ConsoleSelect>
                    </div>

                    <Button type="submit" isLoading={isLoading}>
                        Submit
                    </Button>
                </fieldset>
            </form>
        )
    }
)
