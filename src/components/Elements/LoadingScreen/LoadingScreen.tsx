import * as React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'

import styles from './LoadingScreen.module.css'

export const LoadingScreen = React.memo(
    (): JSX.Element => (
        <div className={styles.loadingScreen} data-testid="loadingScreen">
            <PacmanLoader />
        </div>
    )
)

export const FormLoadingScreen = React.memo(
    (): JSX.Element => (
        <div className={styles.formLoadingScreen} data-testid="loadingScreen">
            <div className={styles.formLoadingScreenBody}>
                <PacmanLoader />
            </div>
        </div>
    )
)
