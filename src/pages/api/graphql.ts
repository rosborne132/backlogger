import { ApolloServer } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'

import { consoleResolvers, gameResolvers } from '@schema/resolvers'
import { Console, Game } from '@schema/types'

import { getServerSideAuth } from '../../../Auth'

const typeDefs = mergeTypeDefs([Console, Game])
const resolvers = mergeResolvers([consoleResolvers, gameResolvers])

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async request => {
        const data = await getServerSideAuth(request.req)

        if (data === null) return

        return {
            ...request,
            ...data
        }
    }
})

export const config = {
    api: {
        bodyParser: process.env.NODE_ENV === 'production'
    }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
