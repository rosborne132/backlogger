// import User from './users'
// import AuthService from '../../services/auth/auth'

// export const userMutations = {
//     Mutation: {
//         async registerUser(_, { user }, req) {
//             try {
//                 const currentUsername = await User.find({ username: user.username })

//                 if (currentUsername.length !== 0) {
//                     console.log('Do not create user')
//                     return
//                 }

//                 // const newUser = await User.create({ ...user })

//                 // return newUser
//                 // const email = user.email
//                 // const password = user.password
//                 return AuthService.signup({ user, req })
//                 // return AuthService.signup({ email, password, username, req })
//             } catch (err) {
//                 console.log(err)
//             }
//         },
//         async loginUser(_, { username, password }, context) {
//             try {
//                 const currentUser = await User.find({ username, password })
//                 console.log(context)

//                 if (currentUser.length === 0) {
//                     console.log('Invalid User! >:(')
//                     return
//                 }

//                 return currentUser[0]
//             } catch (err) {
//                 console.log(err)
//             }
//         },
//     },
// }
