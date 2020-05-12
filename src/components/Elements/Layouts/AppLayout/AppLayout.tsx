import AppHeader from '../../Headers/AppHeader/AppHeader'
import Meta from '../../../Utilities'

const Layout: React.FC = ({ children }): JSX.Element => (
    <>
        <Meta />
        <AppHeader />
        <main>
            <div className="container">{children}</div>
        </main>
    </>
)

export default Layout
