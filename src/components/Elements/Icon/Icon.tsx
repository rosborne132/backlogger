import * as React from 'react'

import { icons } from 'components/Elements/shared/icons'
import { typography } from 'components/Elements/shared/styles'

type IconProps = {
    block?: boolean
    icon: string
    size?: string
    style?: any
}

export const Icon: React.FC<IconProps> = React.memo(
    ({ block = false, icon, size = 'm1', style }): JSX.Element => (
        <svg
            data-testid="icon"
            viewBox="0 0 1024 1024"
            width={typography.size[size]}
            height={typography.size[size]}
            className={`${block ? 'db' : ''} v-mid`}
            style={{
                shapeRendering: 'inherit',
                transform: 'translate3d(0, 0, 0)'
            }}
            {...style}
        >
            {icons[icon].map(path => (
                <path key={path} d={path} />
            ))}
        </svg>
    )
)
