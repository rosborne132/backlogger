import { ApolloServer } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'

import auth0 from '../../lib/auth0'

import userResolvers from '../../src/api/users/resolvers'
import User from '../../src/api/users/Users.graphql'

import deckResolvers from '../../src/api/decks/resolvers'
import Deck from '../../src/api/decks/Decks.graphql'

const typeDefs = mergeTypeDefs([User, Deck])

const resolvers = mergeResolvers([userResolvers, deckResolvers])

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (request) => {
        const data = await auth0.getSession(request.req)
        return {
            ...request,
            ...data,
        }
    },
})

export const config = {
    api: {
        bodyParser: process.env.NODE_ENV === 'production',
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
