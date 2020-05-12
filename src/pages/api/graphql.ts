import { ApolloServer } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'

import { consoleResolvers, gameResolvers } from '../../api/resolvers'

import { Console, Game } from '../../api/types'

const typeDefs = mergeTypeDefs([Console, Game])

const resolvers = mergeResolvers([consoleResolvers, gameResolvers])

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

export const config = {
    api: {
        bodyParser: process.env.NODE_ENV === 'production'
    }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
