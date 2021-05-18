/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserGameInput = {
    game: GameInput
    id?: string | null
}

export type GameInput = {
    console?: ConsoleInput | null
    cover?: CoverInput | null
    id?: string | null
    inBacklog?: boolean | null
    name: string
    slug?: string | null
}

export type ConsoleInput = {
    abbreviation?: string | null
    id?: string | null
    name?: string | null
    slug?: string | null
}

export type CoverInput = {
    id: string
    url: string
}

export type ModelUserGameConditionInput = {
    and?: Array<ModelUserGameConditionInput | null> | null
    or?: Array<ModelUserGameConditionInput | null> | null
    not?: ModelUserGameConditionInput | null
}

export type UserGame = {
    __typename: 'UserGame'
    game?: Game
    id?: string
    createdAt?: string
    updatedAt?: string
}

export type Game = {
    __typename: 'Game'
    console?: Console
    cover?: Cover
    id?: string | null
    inBacklog?: boolean | null
    name?: string
    slug?: string | null
}

export type Console = {
    __typename: 'Console'
    abbreviation?: string | null
    id?: string | null
    name?: string | null
    slug?: string | null
}

export type Cover = {
    __typename: 'Cover'
    id?: string
    url?: string
}

export type UpdateUserGameInput = {
    game?: GameInput | null
    id: string
}

export type DeleteUserGameInput = {
    id?: string | null
}

export type CreateUserConsoleInput = {
    console: ConsoleInput
    id?: string | null
}

export type ModelUserConsoleConditionInput = {
    and?: Array<ModelUserConsoleConditionInput | null> | null
    or?: Array<ModelUserConsoleConditionInput | null> | null
    not?: ModelUserConsoleConditionInput | null
}

export type UserConsole = {
    __typename: 'UserConsole'
    console?: Console
    id?: string
    createdAt?: string
    updatedAt?: string
}

export type UpdateUserConsoleInput = {
    console?: ConsoleInput | null
    id: string
}

export type DeleteUserConsoleInput = {
    id?: string | null
}

export type ModelUserGameFilterInput = {
    id?: ModelIDInput | null
    and?: Array<ModelUserGameFilterInput | null> | null
    or?: Array<ModelUserGameFilterInput | null> | null
    not?: ModelUserGameFilterInput | null
}

export type ModelIDInput = {
    ne?: string | null
    eq?: string | null
    le?: string | null
    lt?: string | null
    ge?: string | null
    gt?: string | null
    contains?: string | null
    notContains?: string | null
    between?: Array<string | null> | null
    beginsWith?: string | null
    attributeExists?: boolean | null
    attributeType?: ModelAttributeTypes | null
    size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
    binary = 'binary',
    binarySet = 'binarySet',
    bool = 'bool',
    list = 'list',
    map = 'map',
    number = 'number',
    numberSet = 'numberSet',
    string = 'string',
    stringSet = 'stringSet',
    _null = '_null'
}

export type ModelSizeInput = {
    ne?: number | null
    eq?: number | null
    le?: number | null
    lt?: number | null
    ge?: number | null
    gt?: number | null
    between?: Array<number | null> | null
}

export type ModelUserGameConnection = {
    __typename: 'ModelUserGameConnection'
    items?: Array<UserGame | null> | null
    nextToken?: string | null
}

export type ModelUserConsoleFilterInput = {
    id?: ModelIDInput | null
    and?: Array<ModelUserConsoleFilterInput | null> | null
    or?: Array<ModelUserConsoleFilterInput | null> | null
    not?: ModelUserConsoleFilterInput | null
}

export type ModelUserConsoleConnection = {
    __typename: 'ModelUserConsoleConnection'
    items?: Array<UserConsole | null> | null
    nextToken?: string | null
}

export type CreateUserGameMutationVariables = {
    input?: CreateUserGameInput
    condition?: ModelUserGameConditionInput | null
}

export type CreateUserGameMutation = {
    createUserGame?: {
        __typename: 'UserGame'
        game: {
            __typename: 'Game'
            console?: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            } | null
            cover?: {
                __typename: 'Cover'
                id: string
                url: string
            } | null
            id?: string | null
            inBacklog?: boolean | null
            name: string
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type UpdateUserGameMutationVariables = {
    input?: UpdateUserGameInput
    condition?: ModelUserGameConditionInput | null
}

export type UpdateUserGameMutation = {
    updateUserGame?: {
        __typename: 'UserGame'
        game: {
            __typename: 'Game'
            console?: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            } | null
            cover?: {
                __typename: 'Cover'
                id: string
                url: string
            } | null
            id?: string | null
            inBacklog?: boolean | null
            name: string
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type DeleteUserGameMutationVariables = {
    input?: DeleteUserGameInput
    condition?: ModelUserGameConditionInput | null
}

export type DeleteUserGameMutation = {
    deleteUserGame?: {
        __typename: 'UserGame'
        game: {
            __typename: 'Game'
            console?: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            } | null
            cover?: {
                __typename: 'Cover'
                id: string
                url: string
            } | null
            id?: string | null
            inBacklog?: boolean | null
            name: string
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type CreateUserConsoleMutationVariables = {
    input?: CreateUserConsoleInput
    condition?: ModelUserConsoleConditionInput | null
}

export type CreateUserConsoleMutation = {
    createUserConsole?: {
        __typename: 'UserConsole'
        console: {
            __typename: 'Console'
            abbreviation?: string | null
            id?: string | null
            name?: string | null
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type UpdateUserConsoleMutationVariables = {
    input?: UpdateUserConsoleInput
    condition?: ModelUserConsoleConditionInput | null
}

export type UpdateUserConsoleMutation = {
    updateUserConsole?: {
        __typename: 'UserConsole'
        console: {
            __typename: 'Console'
            abbreviation?: string | null
            id?: string | null
            name?: string | null
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type DeleteUserConsoleMutationVariables = {
    input?: DeleteUserConsoleInput
    condition?: ModelUserConsoleConditionInput | null
}

export type DeleteUserConsoleMutation = {
    deleteUserConsole?: {
        __typename: 'UserConsole'
        console: {
            __typename: 'Console'
            abbreviation?: string | null
            id?: string | null
            name?: string | null
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type GetUserGameQueryVariables = {
    id?: string
}

export type GetUserGameQuery = {
    getUserGame?: {
        __typename: 'UserGame'
        game: {
            __typename: 'Game'
            console?: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            } | null
            cover?: {
                __typename: 'Cover'
                id: string
                url: string
            } | null
            id?: string | null
            inBacklog?: boolean | null
            name: string
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type ListUserGamesQueryVariables = {
    filter?: ModelUserGameFilterInput | null
    limit?: number | null
    nextToken?: string | null
}

export type ListUserGamesQuery = {
    listUserGames?: {
        __typename: 'ModelUserGameConnection'
        items?: Array<{
            __typename: 'UserGame'
            game: {
                __typename: 'Game'
                id?: string | null
                inBacklog?: boolean | null
                name: string
                slug?: string | null
            }
            id: string
            createdAt: string
            updatedAt: string
        } | null> | null
        nextToken?: string | null
    } | null
}

export type GetUserConsoleQueryVariables = {
    id?: string
}

export type GetUserConsoleQuery = {
    getUserConsole?: {
        __typename: 'UserConsole'
        console: {
            __typename: 'Console'
            abbreviation?: string | null
            id?: string | null
            name?: string | null
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type ListUserConsolesQueryVariables = {
    filter?: ModelUserConsoleFilterInput | null
    limit?: number | null
    nextToken?: string | null
}

export type ListUserConsolesQuery = {
    listUserConsoles?: {
        __typename: 'ModelUserConsoleConnection'
        items?: Array<{
            __typename: 'UserConsole'
            console: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            }
            id: string
            createdAt: string
            updatedAt: string
        } | null> | null
        nextToken?: string | null
    } | null
}

export type OnCreateUserGameSubscription = {
    onCreateUserGame?: {
        __typename: 'UserGame'
        game: {
            __typename: 'Game'
            console?: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            } | null
            cover?: {
                __typename: 'Cover'
                id: string
                url: string
            } | null
            id?: string | null
            inBacklog?: boolean | null
            name: string
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type OnUpdateUserGameSubscription = {
    onUpdateUserGame?: {
        __typename: 'UserGame'
        game: {
            __typename: 'Game'
            console?: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            } | null
            cover?: {
                __typename: 'Cover'
                id: string
                url: string
            } | null
            id?: string | null
            inBacklog?: boolean | null
            name: string
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type OnDeleteUserGameSubscription = {
    onDeleteUserGame?: {
        __typename: 'UserGame'
        game: {
            __typename: 'Game'
            console?: {
                __typename: 'Console'
                abbreviation?: string | null
                id?: string | null
                name?: string | null
                slug?: string | null
            } | null
            cover?: {
                __typename: 'Cover'
                id: string
                url: string
            } | null
            id?: string | null
            inBacklog?: boolean | null
            name: string
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type OnCreateUserConsoleSubscription = {
    onCreateUserConsole?: {
        __typename: 'UserConsole'
        console: {
            __typename: 'Console'
            abbreviation?: string | null
            id?: string | null
            name?: string | null
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type OnUpdateUserConsoleSubscription = {
    onUpdateUserConsole?: {
        __typename: 'UserConsole'
        console: {
            __typename: 'Console'
            abbreviation?: string | null
            id?: string | null
            name?: string | null
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}

export type OnDeleteUserConsoleSubscription = {
    onDeleteUserConsole?: {
        __typename: 'UserConsole'
        console: {
            __typename: 'Console'
            abbreviation?: string | null
            id?: string | null
            name?: string | null
            slug?: string | null
        }
        id: string
        createdAt: string
        updatedAt: string
    } | null
}
