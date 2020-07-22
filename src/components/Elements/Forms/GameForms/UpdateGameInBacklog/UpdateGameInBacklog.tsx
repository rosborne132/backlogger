import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Form } from 'src/components/Elements'
import { ModalContext } from 'src/context'
import { UPDATE_USER_GAME } from 'src/lib/queries'

export type UpdateGameInBacklogProps = {
    userGameId: string
    inBacklog: boolean
}

export const UpdateGameInBacklog: React.FC = React.memo(
    ({ userGameId, inBacklog }: UpdateGameInBacklogProps): JSX.Element => {
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
            <Form
                closeForm={(e: React.MouseEvent<HTMLButtonElement>) => closeForm(e)}
                formId="updateGameInBacklog"
                isLoading={isLoading}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
            >
                {inBacklog ? (
                    <p>Would you like to add this game to your backlog?</p>
                ) : (
                    <p>Would you like to remove this game from your backlog?</p>
                )}
            </Form>
        )
    }
)
