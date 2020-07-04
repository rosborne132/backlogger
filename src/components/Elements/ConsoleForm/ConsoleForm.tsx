import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Button, ConsoleSelect, FormLoadingScreen } from 'src/components/Elements'

import { ModalContext } from 'src/context'

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
        const { closeModal } = React.useContext(ModalContext)
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

        const closeForm = (e: React.MouseEvent<HTMLButtonElement>): any => {
            e.preventDefault()
            setSelectedConsole({})
            closeModal()
        }

        if (!data) return <FormLoadingScreen />

        return (
            <form
                style={{ width: 'var(--spacing-xxxlg)', height: 'var(--spacing-xxlg)' }}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
                data-testid="consoleForm"
            >
                <fieldset style={{ border: 'none' }}>
                    <ConsoleSelect
                        inputId="consoleSelect"
                        labelText="Console: "
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedConsole(e.target.value)}
                    >
                        {consoles.map(({ id, name }: { id: string; name: string }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </ConsoleSelect>

                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', top: 20 }}>
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
