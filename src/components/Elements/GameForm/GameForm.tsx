import * as React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PacmanLoader from 'react-spinners/PacmanLoader'

import { GET_USER_CONSOLES } from 'src/pages/app/[id]'

import { Button } from 'src/components/Elements'

// export const ADD_USER_CONSOLE = gql`
//     mutation addUserConsole($console: UserConsoleInput) {
//         addUserConsole(console: $console) {
//             id
//             name
//             slug
//         }
//     }
// `

export const GameForm: React.FC = React.memo(
    (): JSX.Element => {
        const [consoles, setConsoles] = React.useState([])
        const [selectedConsole, setSelectedConsole] = React.useState({})
        const [isLoading, setIsLoading] = React.useState(false)
        const { data: getUserConsoles } = useQuery(GET_USER_CONSOLES)
        // const [addUserConsole] = useMutation(ADD_USER_CONSOLE, {
        //     refetchQueries: ['GetConsoles', 'GetUserConsoles']
        // })

        React.useEffect(() => {
            if (getUserConsoles.getUserConsoles !== undefined) {
                setConsoles(getUserConsoles.getUserConsoles)
                setSelectedConsole(getUserConsoles.getUserConsoles[0].id)
            }
        }, [getUserConsoles.getUserConsoles])

        const onSubmit = async (
            e: React.FormEvent<HTMLFormElement>
        ): Promise<void> => {
            e.preventDefault()
            console.log('Form submit')
            setIsLoading(true)

            // const submitedConsole = consoles.find(
            //     ({ id }: { id: string }) => id === selectedConsole
            // )
            // const { id, name, slug } = submitedConsole

            // await addUserConsole({
            //     variables: { console: { id, name, slug } }
            // })

            setIsLoading(false)
        }

        if (!getUserConsoles.getUserConsoles) {
            return (
                <div className="h4 w5" data-testid="loadingScreen">
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
            <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
                data-testid="gameForm"
            >
                <fieldset className="bn">
                    <label htmlFor="consoleSelect" className="db f4">
                        Console:
                    </label>
                    <select
                        name="consoleSelect"
                        id="consoleSelect"
                        data-testid="consoleSelect"
                        className="ba b--black h2 mv3"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setSelectedConsole(e.target.value)
                        }
                    >
                        {consoles.map(
                            ({
                                console: { id, name }
                            }: {
                                console: { id: string; name: string }
                            }) => (
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
