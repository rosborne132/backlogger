import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { DELETE_USER_GAME } from 'src/lib/queries'
import { Form } from 'src/components/Elements'
import { ModalContext } from 'src/context'

export type RemoveFromCollectionProps = {
    userGameId: string
}

export const RemoveFromCollection: React.FC = React.memo(
    ({ userGameId }: RemoveFromCollectionProps): JSX.Element => {
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
                formId="removeFromCollection"
                isLoading={isLoading}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
            >
                <p>Would you like to remove this game from your collection?</p>
            </Form>
        )
    }
)
