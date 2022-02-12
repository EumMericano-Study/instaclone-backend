import { ErrorMessage } from "@src/constants";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";
import { Resolvers } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unFollowUser: protectedResolver(
      async (_, { userName }, { loggedInUser, client }) => {
        const followUserInfo = await client.user.findUnique({
          where: { userName },
        });
        if (!followUserInfo)
          return throwErrorMessage(ErrorMessage.USER_NOT_FOUND);
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: {
                userName,
              },
            },
          },
        });
        return throwOK();
      }
    ),
  },
};

export default resolvers;
