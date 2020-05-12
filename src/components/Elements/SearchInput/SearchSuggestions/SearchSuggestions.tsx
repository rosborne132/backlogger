type Props = {
    results: string[],
    querySelected: boolean,
    setQuerySelected: (querySelected) => void,
    setQuery: (result) => void
}

const SearchSuggestions: React.FC<Props> = ({
    results = [], setQuery, querySelected = false, setQuerySelected,
}): JSX.Element => {
    const listResults = results.map((result, index) => (
        <div
            role="menuitem"
            tabIndex={index}
            key={result}
            onClick={() => {
                setQuerySelected(true)
                setQuery(result)
            }}
            onKeyDown={() => {
                setQuerySelected(true)
                setQuery(result)
            }}
        >
            {result}
            <style jsx>
                {`
                    div {
                        padding: 5px 0;
                        width: 252px;
                        font-size: 17px;
                        background-color: #fff;

                    }

                    div:hover {
                        background-color: #F8F8F8;
                    }
                `}
            </style>
        </div>
    ))

    return (
        <div>
            { !querySelected
                ? listResults
                : '' }
            <style jsx>
                {`
                    div {
                        position: absolute;
                        width: inherit;
                        border-right: 1px solid #000;
                        border-left: 1px solid #000;
                        border-bottom: 1px solid #000;
                        text-indent: 11px;
                    }

                    div:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </div>
    )
}

export default SearchSuggestions
