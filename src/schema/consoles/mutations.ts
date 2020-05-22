import { Platform as Console, User } from '@types'

// export const consoleMutations = {
//   Mutation: {
//     async addUserConsole(console) {
//       //   try {
//       //     console.log(console);
//       //     return "hello";
//       //   } catch (err) {
//       //     console.error(err);
//       //   }

//       console.log("hello");
//     },
//   },
// };

export const consoleMutations = {
    Mutation: {
        async addUserConsole(
            parent: any,
            args: Console,
            { user }: { user: User }
        ) {
            try {
                console.log(user)
                console.log(args.console)

                // Create master object

                // Pass object in Dynamodb helper

                // Return master created object
                return args.console
            } catch (err) {
                console.error(err)
            }
        }
    }
}
