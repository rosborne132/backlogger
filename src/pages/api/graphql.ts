import { ApolloServer } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'

import { consoleResolvers, gameResolvers } from 'schema/resolvers'
import { Console, Game } from 'schema/types'

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
