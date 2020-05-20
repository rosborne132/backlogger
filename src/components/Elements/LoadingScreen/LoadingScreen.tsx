import * as React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'

export const LoadingScreen = React.memo(() => (
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
))
