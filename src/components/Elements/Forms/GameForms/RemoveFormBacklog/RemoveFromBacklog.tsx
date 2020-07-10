import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Button, FormLoadingScreen } from 'src/components/Elements'

import { ModalContext } from 'src/context'

// export const ADD_USER_GAME = gql`
//     mutation addUserGame($game: UserGameInput) {
//         addUserGame(game: $game) {
//             console {
//                 id
//                 name
//             }
//             cover {
//                 url
//             }
//             id
//             inBacklog
//             name
//         }
//     }
// `

export type RemoveFromBacklogProps = {
    userGameId: string
}

export const RemoveFromBacklog: React.FC<RemoveFromBacklogProps> = React.memo(
    ({ userGameId }): JSX.Element => {
        const [isLoading, setIsLoading] = React.useState(false)
        const { closeModal } = React.useContext(ModalContext)
        // const [addUserGame] = useMutation(ADD_USER_GAME, {
        //     refetchQueries: ['GetUserGames', 'GetGamesByConsoleId']
        // })

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault()
            setIsLoading(true)

            // const submitedConsole = consoles.find(({ value }: { value: string }) => value === selectedConsoleId)
            // const { value, label, slug } = submitedConsole

            // await addUserGame({
            //     variables: {
            //         game: {
            //             consoleId: value,
            //             consoleName: label,
            //             consoleSlug: slug,
            //             name
            //         }
            //     }
            // })

            setIsLoading(false)
        }

        const closeForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
            e.preventDefault()
            closeModal()
        }

        return (
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)} data-testid="gameForm">
                <fieldset style={{ border: 'none' }}>
                    <p>Would you like to remove game {userGameId}?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => closeForm(e)}
                            className="cancel"
                            isLoading={isLoading}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" isLoading={isLoading}>
                            Submit
                        </Button>
                    </div>
                </fieldset>
            </form>
        )
    }
)
