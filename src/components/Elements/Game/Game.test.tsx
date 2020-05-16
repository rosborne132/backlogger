import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { Game } from './Game'

describe('<Game />', () => {
    afterEach(cleanup)
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            cover: { id: 1, url: 'link' },
            name: 'Game Title',
            platforms: [{ id: 1, name: 'Console' }],
            slug: 'game-slug'
        }
    })

    test('renders game component', () => {
        const { queryByTestId } = render(<Game {...defaultProps} />)

        expect(queryByTestId('game')).toBeTruthy()
    })

    test('game displays game cover', () => {
        const { queryByTestId } = render(<Game {...defaultProps} />)

        expect(queryByTestId('gameImage')).toBeTruthy()
        expect(queryByTestId('noGameImage')).toBeFalsy()
    })

    test('game displays no game cover message', () => {
        defaultProps.cover = null
        const { queryByTestId } = render(<Game {...defaultProps} />)

        expect(queryByTestId('noGameImage').textContent).toBe('Game Title')
        expect(queryByTestId('noGameImage')).toBeTruthy()
        expect(queryByTestId('gameImage')).toBeFalsy()
    })
})
