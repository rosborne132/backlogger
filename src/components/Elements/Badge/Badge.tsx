import * as React from 'react'

import styles from './Badge.module.css'

type BadgeProps = {
    name: string
    slug: string
}

export const Badge: React.FC<BadgeProps> = React.memo(({ name, slug }) => (
    <div data-testid="badge" className={`${styles.badge} ${styles[slug]}`}>
        {name}
    </div>
))
