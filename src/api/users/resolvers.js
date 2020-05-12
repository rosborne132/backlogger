const userResolvers = {
    Query: {
        async getUser(parent, args, context) {
            try {
                return context.user
            } catch (err) {
                console.error(err)
            }
        },
    },
}

export default userResolvers
