import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Form } from 'src/components/Elements'

import { ModalContext } from 'src/context'

export const DELETE_USER_GAME = gql`
    mutation removeGame($game: GameInput) {
        removeGame(game: $game) {
            status
        }
    }
`

export type RemoveFromBacklogProps = {
    userGameId: string
}

export const RemoveFromBacklog: React.FC<RemoveFromBacklogProps> = React.memo(
    ({ userGameId }): JSX.Element => {
        const [isLoading, setIsLoading] = React.useState(false)
        const { closeModal } = React.useContext(ModalContext)
        const [removeGame] = useMutation(DELETE_USER_GAME, {
            refetchQueries: ['GetUserGames']
        })

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            await removeGame({
                variables: {
                    game: {
                        gameId: userGameId
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
            <Form
                closeForm={(e: React.MouseEvent<HTMLButtonElement>) => closeForm(e)}
                formId="gameForm"
                isLoading={isLoading}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
            >
                <p>Would you like to remove this game from your collection?</p>
            </Form>
        )
    }
)
