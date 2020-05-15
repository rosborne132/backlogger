import * as React from 'react'
import { useRouter } from 'next/router'

import { ConsoleForm, Header, Modal } from '../../../Elements'
import { Meta } from '../../../Utilities'

type Console = {
    id: string
    name: string
}

type AppLayoutProps = {
    children?: React.ReactNode
    consoles: Console[]
}

export const AppLayout: React.FC<AppLayoutProps> = React.memo(
    ({ children, consoles = [] }): JSX.Element => {
        const [selected, setSelected] = React.useState<string | string[]>('')
        const [showConsoleForm, setShowConsoleForm] = React.useState(false)
        const router = useRouter()

        React.useEffect(() => {
            let consoleSelected =
                router.query.id != undefined ? router.query.id : ''
            setSelected(consoleSelected)
        }, [consoles])

        return (
            <>
                <Meta />
                <Header />
                <main>
                    <div className="flex">
                        <ul className="list ml0 pl0 w-10">
                            <li
                                className={`ba pointer pl2 pv3 ${
                                    showConsoleForm ? 'bg-black white' : ''
                                }`}
                                onClick={() => setShowConsoleForm(true)}
                            >
                                + Console
                            </li>
                            {consoles.map(({ id, name }) => (
                                <li
                                    className={`ba pointer pl2 pv3 ${
                                        selected === id ? 'bg-black white' : ''
                                    }`}
                                    key={id}
                                    onClick={() =>
                                        router.push('/app/[id]', `/app/${id}`)
                                    }
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <section className="flex justify-center w-90">
                            <div>{children}</div>
                            <Modal
                                isShowing={showConsoleForm}
                                onClose={() => setShowConsoleForm(false)}
                            >
                                <ConsoleForm />
                            </Modal>
                        </section>
                    </div>
                </main>
            </>
        )
    }
)
