import * as React from 'react'
import Autosuggest from 'react-autosuggest'
import { useLazyQuery } from '@apollo/react-hooks'

import { GET_GAMES_BY_NAME } from 'src/lib/queries'

export type InputType = {
    labelText?: string
    inputId: string
    onChange: (value: string) => void
}

export const GameSuggestionInput = ({ labelText = '', inputId, onChange }: InputType) => {
    const [value, setValue] = React.useState('')
    const [suggestions, setSuggestions] = React.useState([])
    const [getGames, { data }] = useLazyQuery(GET_GAMES_BY_NAME, {
        variables: { name: value }
    })

    React.useEffect(() => {
        onChange(value)
    }, [value])

    React.useEffect(() => {
        if (data !== undefined && data.fetchGamesByName !== undefined) {
            setSuggestions(data.fetchGamesByName)
        }
    }, [data])

    const renderSuggestion = ({ name }: { name: string }) => <div>{name}</div>
    const getSuggestionValue = ({ name }: { name: string }) => name
    const onSuggestionsClearRequested = () => setSuggestions([])
    const onSuggestionsFetchRequested = async ({ value }: { value: string }) => {
        if (value.length % 2 === 0) {
            await getGames()
        }
    }

    const inputProps = {
        placeholder: 'Type a game',
        value,
        onChange: (event: any, { newValue }: { newValue: string }) => setValue(newValue)
    }

    return (
        <div>
            {labelText.length ? <label htmlFor={inputId}>{labelText}</label> : null}
            <div data-testid={inputId}>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        </div>
    )
}
