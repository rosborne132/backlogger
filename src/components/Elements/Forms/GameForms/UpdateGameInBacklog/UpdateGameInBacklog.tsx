import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ButtonGroup } from 'src/components/Elements'

import { ModalContext } from 'src/context'

export const UPDATE_USER_GAME = gql`
    mutation updateGame($game: GameInput) {
        updateGame(game: $game) {
            status
        }
    }
`

export type UpdateGameInBacklogProps = {
    userGameId: string
    inBacklog: boolean
}

export const UpdateGameInBacklog: React.FC<UpdateGameInBacklogProps> = React.memo(
    ({ userGameId, inBacklog }): JSX.Element => {
        const [isLoading, setIsLoading] = React.useState(false)
        const { closeModal } = React.useContext(ModalContext)
        const [updateGame] = useMutation(UPDATE_USER_GAME, {
            refetchQueries: ['GetUserGames']
        })

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            await updateGame({
                variables: {
                    game: {
                        gameId: userGameId,
                        inBacklog
                    }
                }
            })

            setIsLoading(false)
            closeModal()
        }

        const closeForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
            e.preventDefault()
            closeModal()
        }

        return (
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)} data-testid="gameForm">
                <fieldset style={{ border: 'none' }}>
                    {inBacklog ? (
                        <p>Would you like to add this game to your backlog?</p>
                    ) : (
                        <p>Would you like to remove this game from your backlog?</p>
                    )}

                    <ButtonGroup
                        isLoading={isLoading}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => closeForm(e)}
                    />
                </fieldset>
            </form>
        )
    }
)
