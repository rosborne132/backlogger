import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { Grid } from './Grid'

describe('<Grid />', () => {
    afterEach(cleanup)

    test('renders grid', () => {
        const { queryByTestId } = render(
            <Grid>
                <div>Opened Modal</div>
            </Grid>
        )

        expect(queryByTestId('grid')).toBeTruthy()
    })
})
