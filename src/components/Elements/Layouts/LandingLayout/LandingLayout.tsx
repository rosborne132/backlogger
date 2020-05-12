import LandingHeader from '../../Headers/LandingHeader/LandingHeader'
import Meta from '../../../Utilities'

const LandingLayout: React.FC = ({ children }): JSX.Element => (
    <>
        <Meta />
        <LandingHeader />
        <main>
            <div className="container">{children}</div>
        </main>
    </>
)

export default LandingLayout
