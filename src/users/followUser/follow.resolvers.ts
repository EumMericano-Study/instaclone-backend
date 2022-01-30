import { ErrorMessage } from "@src/constants";
import { protectedResolver } from "../users.utils";

const resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { userName }, { loggedInUser, client }) => {
        const followUserInfo = await client.user.findUnique({
          where: { userName },
          select: { id: true },
        });
        if (!followUserInfo)
          return {
            ok: false,
            error: ErrorMessage.USER_NOT_FOUND,
          };
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              connect: {
                userName,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
