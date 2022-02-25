import { Resolvers, Room, Message } from "@src/types";

const resolver: Resolvers = {
  Room: {
    users: ({ id }: Room, { client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }: Room, { client }) =>
      client.message.findMany({
        where: { roomId: id },
      }),
    unreadTotal: ({ id }: Room, _, { client }) =>
      client.message.count({
        where: {
          read: false,
          roomId: id,
        },
      }),
  },
};

export default resolver;
