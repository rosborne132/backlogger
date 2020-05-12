import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchSuggestions from './SearchSuggestions/SearchSuggestions'

type Props = {
    queryName: string
}

const SearchInput: React.FC<Props> = ({ queryName = '' }): JSX.Element => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [querySelected, setQuerySelected] = useState(false)

    const upperCaseStr = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    const getInfo = async () => {
        const searchQuery: string = query.toLocaleLowerCase()
        const { data } = await axios.get(`https://api.pokemontcg.io/v1/${queryName}?name=${searchQuery}`)

        const resultList: string[] = data[queryName].map((result) => result.name)
        const resultKeys: string[] = Array.from(new Set(resultList))
        const newResults: string[] = resultKeys.filter((result) => result.toLowerCase() !== searchQuery.trim())

        setResults([...newResults])
    }

    useEffect(() => {
        if (query && query.length >= 1) {
            getInfo()
            return
        }

        setResults([])
    }, [query])

    return (
        <span>
            <input
                placeholder={`Search ${upperCaseStr(queryName)}...`}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setQuerySelected(false)
                }}
                value={query}
            />

            { results.length
                ? (
                    <SearchSuggestions
                        results={results}
                        setQuery={setQuery}
                        querySelected={querySelected}
                        setQuerySelected={setQuerySelected}
                    />
                )
                : '' }

            <style jsx>
                {`
                    input {
                        position:relative;  
                        border: 1px solid #000;
                        width: 250px;
                        height: 30px;
                        text-indent: 10px;
                        font-size: 17px;
                    }

                    span {
                        padding: 40px;
                    }
                `}
            </style>
        </span>
    )
}

export default SearchInput
