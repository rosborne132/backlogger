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
                const filteredConsoles = data.getConsoles.map(userConsole => {
                    return {
                        value: userConsole.id,
                        label: userConsole.name,
                        slug: userConsole.slug
                    }
                })
                setConsoles(filteredConsoles)
            }
        }, [data])

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            const submitedConsole = consoles.find(({ value }: { value: string }) => value === selectedConsole)
            const { value, label, slug } = submitedConsole

            await addUserConsole({
                variables: { console: { id: value, name: label, slug } }
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
                <fieldset>
                    <ConsoleSelect
                        inputId="consoleSelect"
                        labelText="Console: "
                        onChange={(newValue: string) => setSelectedConsole(newValue)}
                        options={consoles}
                    />

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
