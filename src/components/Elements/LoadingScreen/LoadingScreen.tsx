import * as React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'

export const LoadingScreen = React.memo(
    (): JSX.Element => (
        <div
            className="bg-white"
            data-testid="loadingScreen"
            style={{
                position: 'fixed',
                top: '45%',
                left: '50%',
                transform: 'translate3d(-50%, -50%, 0)',
                zIndex: 4
            }}
        >
            <PacmanLoader />
        </div>
    )
)

export const FormLoadingScreen = React.memo(
    (): JSX.Element => (
        <div className="h4 w5" data-testid="loadingScreen">
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '40%',
                    transform: 'translate3d(-50%, -40%, 0)',
                    zIndex: 4
                }}
            >
                <PacmanLoader />
            </div>
        </div>
    )
)
