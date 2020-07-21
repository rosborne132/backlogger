import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { ADD_USER_CONSOLE, GET_CONSOLES } from 'src/lib/queries'
import { ConsoleSelect, Form, FormLoadingScreen } from 'src/components/Elements'
import { ModalContext } from 'src/context'
import { Platform as Console } from 'src/types'

export const AddConsole: React.FC = React.memo(
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
                const filteredConsoles = data.getConsoles.map((userConsole: Console) => {
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
            closeModal()
        }

        const closeForm = (e: React.MouseEvent<HTMLButtonElement>): any => {
            e.preventDefault()
            setSelectedConsole({})
            closeModal()
        }

        if (!data) return <FormLoadingScreen />

        return (
            <Form
                closeForm={(e: React.MouseEvent<HTMLButtonElement>) => closeForm(e)}
                formId="addConsole"
                isLoading={isLoading}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
            >
                <ConsoleSelect
                    inputId="consoleSelect"
                    labelText="Console: "
                    onChange={(newValue: string) => setSelectedConsole(newValue)}
                    options={consoles}
                />
            </Form>
        )
    }
)
