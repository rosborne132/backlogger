import * as React from 'react'
import { Header } from '../../Header/Header'
import { Meta } from '../../../Utilities'
import { useRouter } from 'next/router'

export const AppLayout: React.FC = React.memo(
    ({ children, consoles = [] }): JSX.Element => {
        const [selected, setSelected] = React.useState('')
        const router = useRouter()

        React.useEffect(() => {
            let consoleSelected =
                router.query.id != undefined ? router.query.id : ''
            setSelected(consoleSelected)
        }, [consoles])

        console.log(router)

        return (
            <>
                <Meta />
                <Header />
                <main>
                    <div className="layout">
                        <ul>
                            {consoles.map(({ id, name }) => (
                                <li
                                    className={
                                        selected === id ? 'selected' : ''
                                    }
                                    key={id}
                                    onClick={() =>
                                        router.push('/app/[id]', `/app/${id}`)
                                    }
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <section>{children}</section>
                    </div>
                    <style jsx>
                        {`
                            .layout {
                                display: flex;
                            }

                            ul {
                                width: 10%;
                                list-style: none;
                                margin-left: 0;
                                padding-left: 0;
                            }

                            li {
                                border: 1px solid #000;
                                padding: 10px 0;
                                padding-left: 10px;
                            }

                            li:hover {
                                cursor: pointer;
                            }

                            .selected {
                                background: #000;
                                color: #fff;
                            }

                            section {
                                width: 90%;
                                display: flex;
                                justify-content: center;
                            }
                        `}
                    </style>
                </main>
            </>
        )
    }
)
