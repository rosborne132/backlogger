import * as React from 'react'
import axios from 'axios'
import { API } from 'aws-amplify'

import { ConsoleSelect, Form, FormLoadingScreen } from 'src/components/Elements'
import { ModalContext } from 'src/context'
import { Platform as Console } from 'src/lib/types'

import { createUserConsole } from 'src/graphql/mutations'
import { listUserConsoles } from 'src/graphql/queries'

export const AddConsole: React.FC = React.memo(
    (): JSX.Element => {
        const { closeModal } = React.useContext(ModalContext)
        const [consoles, setConsoles] = React.useState([])
        const [selectedConsole, setSelectedConsole] = React.useState({})
        const [isLoading, setIsLoading] = React.useState(false)
        const [isFetchingData, setIsFetchingData] = React.useState(true)
        // const { data } = useQuery(GET_CONSOLES)
        // const [addUserConsole] = useMutation(ADD_USER_CONSOLE, {
        //     refetchQueries: ['GetConsoles', 'GetUserConsoles']
        // })

        React.useEffect(() => {
            const getConsoleOptions = async (): Promise<[]> => {
                const consolesFetched = await axios({
                    url: 'https://api-v3.igdb.com/platforms',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'user-key': process.env.API_KEY
                    },
                    data: 'fields name, slug; where product_family = (1,2,3,5); limit 100;'
                })

                if (consolesFetched.data === null || consolesFetched.data === undefined) return []

                const response = await API.graphql({ authMode: 'AMAZON_COGNITO_USER_POOLS', query: listUserConsoles })

                console.log('form response: ', response)

                return consolesFetched.data.filter(
                    ({ id }) => !response.data.listUserConsoles.items.some(({ console }) => parseInt(console.id) === id)
                )
            }

            try {
                getConsoleOptions().then(consoleOptions => {
                    const filteredConsoleOptions = consoleOptions.map((userConsole: Console) => ({
                        value: userConsole.id,
                        label: userConsole.name,
                        slug: userConsole.slug
                    }))

                    setIsFetchingData(false)
                    setConsoles(filteredConsoleOptions)
                })
            } catch ({ errors }) {
                console.error(...errors)
                throw new Error(errors[0].message)
            }
        }, [])

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            try {
                const submitedConsole = consoles.find(({ value }: { value: string }) => value === selectedConsole)
                const { value, label, slug } = submitedConsole

                const response = await API.graphql({
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                    query: createUserConsole,
                    variables: { console: { id: value, name: label, slug } }
                })

                console.log('response: ', JSON.stringify(response))

                setIsLoading(false)
                closeModal()
            } catch ({ errors }) {
                console.error(...errors)
                throw new Error(errors[0].message)
            }
        }

        const closeForm = (e: React.MouseEvent<HTMLButtonElement>): any => {
            e.preventDefault()
            setSelectedConsole({})
            closeModal()
        }

        if (isFetchingData) return <FormLoadingScreen />

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
