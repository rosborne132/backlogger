import * as React from 'react'

import styles from './Grid.module.css'

type GridProps = {
    children: React.ReactNode
}

export const Grid: React.FC<GridProps> = React.memo(({ children }) => (
    <div className={styles.grid} data-testid="grid">
        {children}
    </div>
))
