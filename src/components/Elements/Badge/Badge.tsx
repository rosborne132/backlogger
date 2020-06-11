import * as React from 'react'

type BadgeProps = {
    name: string
    slug: string
}

export const Badge: React.FC<BadgeProps> = React.memo(({ name, slug }) => (
    <div data-testid="badge" className={`ba br4 pa1 ma1 tc w3-5 ${slug}`}>
        {name}
    </div>
))