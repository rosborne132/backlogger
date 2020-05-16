import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Button } from '../'

const GET_CONSOLES = gql`
    query GET_CONSOLES {
        getConsoles {
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

        React.useEffect(() => {
            if (data !== undefined) {
                setConsoles(data.getConsoles)
                setSelectedConsole(data.getConsoles[0].id)
            }
        }, [data])

        const onSubmit = e => {
            e.preventDefault()
            setIsLoading(true)

            setTimeout(() => {
                const submitedConsole = consoles.find(
                    ({ id }) => id === selectedConsole
                )
                console.log(submitedConsole)
                setIsLoading(false)
            }, 2000)
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
                        onChange={e => setSelectedConsole(e.target.value)}
                    >
                        {consoles.map(({ id, name }) => (
                            <option
                                className="overflow-scroll"
                                key={id}
                                value={id}
                            >
                                {name}
                            </option>
                        ))}
                    </select>
                    <Button type="submit" isLoading={isLoading}>
                        Submit
                    </Button>
                </fieldset>
            </form>
        )
    }
)
