import { Resolvers } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

const resolver: Resolvers = {
  Query: {
    seeRooms: protectedResolver(async (_, __, { loggedInUser, client }) =>
      client.room.findMany({
        where: {
          users: {
            some: { id: loggedInUser.id },
          },
        },
      })
    ),
  },
};

export default resolver;
