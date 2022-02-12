import { Resolvers } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

const resolver: Resolvers = {
  Query: {
    seeRoom: protectedResolver((_, { id }, { loggedInUser, client }) =>
      client.room.findFirst({
        where: {
          id,
          users: { some: { id: loggedInUser.id } },
        },
      })
    ),
  },
};

export default resolver;
