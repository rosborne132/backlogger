import * as React from 'react'
import Autosuggest from 'react-autosuggest'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

export type InputType = {
    labelText?: string
    inputId: string
    onChange: (value: string) => void
}

export const GET_GAMES_BY_NAME = gql`
    query GetGamesByName($name: String) {
        getGamesByName(name: $name) {
            name
        }
    }
`

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
        if (data !== undefined && data.getGamesByName !== undefined) {
            setSuggestions(data.getGamesByName)
        }
    }, [data])

    const renderSuggestion = suggestion => <div>{suggestion.name}</div>
    const getSuggestionValue = suggestion => suggestion.name
    const onSuggestionsClearRequested = () => setSuggestions([])
    const onSuggestionsFetchRequested = async ({ value }) => {
        if (value.length % 2 === 0) {
            await getGames()
        }
    }

    const inputProps = {
        placeholder: 'Type a game',
        value,
        onChange: (event, { newValue }) => setValue(newValue)
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
