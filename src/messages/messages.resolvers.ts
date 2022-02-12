import { Resolvers, Room, Message } from "@src/types";

const resolver: Resolvers = {
  Room: {
    users: ({ id }: Room, { client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }: Message, { client }) =>
      client.message.findMany({
        where: { roomId: id },
      }),
  },
};

export default resolver;
