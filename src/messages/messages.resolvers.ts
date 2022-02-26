import { Resolvers, Room, Message } from "@src/types";

const resolver: Resolvers = {
  Room: {
    users: ({ id }: Room, _, { client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }: Room, { client }) =>
      client.message.findMany({
        where: { roomId: id },
      }),
    unreadTotal: ({ id }: Room, _, { loggedInUser, client }) => {
      if (!loggedInUser) return 0;
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { id: { not: loggedInUser.id } },
        },
      });
    },
  },
};

export default resolver;
