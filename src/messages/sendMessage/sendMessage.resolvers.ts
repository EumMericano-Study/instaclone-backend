import { ErrorMessage } from "@src/constants";
import { Resolvers } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

interface Args {
  payload: string;
  roomId: number;
  userId: number;
}

const resolver: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (
        _,
        { payload, roomId, userId }: Args,
        { loggedInUser, client }
      ) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });

          if (!user)
            return {
              ok: false,
              error: ErrorMessage.USER_NOT_FOUND,
            };

          room = await client.room.create({
            data: {
              users: {
                connect: [{ id: userId }, { id: loggedInUser.id }],
              },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });

          if (!room)
            return {
              ok: false,
              error: ErrorMessage.ROOM_NOT_FOUND,
            };
        }
        await client.message.create({
          data: {
            payload,
            room: { connect: { id: room.id } },
            user: { connect: { id: loggedInUser.id } },
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolver;
