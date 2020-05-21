import { ApolloServer } from 'apollo-server-micro'
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit'
import { ServerRequest } from '@types/node'

import { getServerSideAuth } from '@lib/auth'

import { consoleResolvers, gameResolvers } from '@schema/resolvers'
import { Console, Game } from '@schema/types'

const typeDefs = mergeTypeDefs([Console, Game])
const resolvers = mergeResolvers([consoleResolvers, gameResolvers])

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (request: ServerRequest) => {
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
