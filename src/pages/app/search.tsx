import { Suspense } from 'react'
import useSWR from 'swr'
import { AppLayout, SearchInput } from '../../components/Elements'
import withApollo from '../../../lib/apollo'

type Card = {
    id: string,
    imageUrl: string,
    name: string
}

const createCardListDisplay = ({ cards }): Card[] => cards.map(({ id, imageUrl, name }: Card): JSX.Element => (
    <div key={id} className="bs_xl">
        <img src={imageUrl} alt={name} />
    </div>
))

const Search: React.FC = (): JSX.Element => {
    const fetchMethod = (url) => fetch(url).then((_) => _.json())
    const { error, data } = useSWR('https://api.pokemontcg.io/v1/cards', fetchMethod)

    if (error) return <div>failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <AppLayout>
            <div className="hero">
                <SearchInput queryName="sets" />
                <SearchInput queryName="cards" />
            </div>

            <div className="container">
                <h1 className="tc">Card List Component!</h1>
                <Suspense fallback={<div>loading...</div>}>
                    <div className="grid">
                        { createCardListDisplay(data) }
                    </div>
                </Suspense>
            </div>
            <style jsx>
                {`
                    .hero {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                    }
                `}
            </style>
        </AppLayout>
    )
}

export default withApollo(Search)
