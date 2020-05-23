import { ApolloServer } from 'apollo-server-micro'
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'

import { getServerSideAuth } from 'src/lib/auth'

import { consoleResolvers, gameResolvers } from 'src/schema/resolvers'
import { consoleMutations } from 'src/schema/mutations'

// @ts-ignore
import { Console, Game } from 'src/schema/types'

const typeDefs = mergeTypes([Console, Game])
const resolvers = mergeResolvers([
    consoleResolvers,
    consoleMutations,
    gameResolvers
])

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (request: any) => {
        const data = await getServerSideAuth(request.req)

        if (data === null) return

        return { user: { ...data.accessTokenData } }
    }
})

export const config = {
    api: {
        bodyParser: process.env.NODE_ENV === 'production'
    }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
