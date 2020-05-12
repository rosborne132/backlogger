import { createContext } from 'react'

type User = {
    name: string
    nickname: string
    picture: string
}

type initialValues = {
    user: User,
    loading: boolean
}

const initialValues = {
    user: {} as User,
    loading: false,
}

const UserContext = createContext<initialValues>(initialValues)

export default UserContext
