import * as React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'

import styles from './LoadingScreen.module.css'

export const LoadingScreen: React.FC = React.memo(
    (): React.ReactNode => (
        <div className={styles.loadingScreen} data-testid="loadingScreen">
            <PacmanLoader />
        </div>
    )
)

export const FormLoadingScreen: React.FC = React.memo(
    (): React.ReactNode => (
        <div className={styles.formLoadingScreen} data-testid="loadingScreen">
            <div className={styles.formLoadingScreenBody}>
                <PacmanLoader />
            </div>
        </div>
    )
)
