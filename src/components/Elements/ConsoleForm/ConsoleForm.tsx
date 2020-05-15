import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_CONSOLES = gql`
    query GET_CONSOLES {
        getConsoles {
            id
            name
        }
    }
`

export const ConsoleForm: React.FC = React.memo(
    (): JSX.Element => {
        const [consoles, setConsoles] = React.useState([])
        const { data, loading } = useQuery(GET_CONSOLES)

        React.useEffect(() => {
            if (data !== undefined) {
                setConsoles(data.getConsoles)
            }
        }, [data])

        return (
            <form className="w6">
                <fieldset className="bn">
                    <label htmlFor="consoleSelect" className="db f4 mb2">
                        Console:
                    </label>
                    <select
                        name="consoleSelect"
                        id="consoleSelect"
                        className="h2 w-100"
                    >
                        {consoles.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </fieldset>
            </form>
        )
    }
)
