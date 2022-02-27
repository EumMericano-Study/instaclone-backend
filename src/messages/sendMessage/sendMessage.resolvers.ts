import { ErrorMessage, PubSubMessage } from "@src/constants";
import pubsub from "@src/pubsub";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";
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

          if (!user) return throwErrorMessage(ErrorMessage.USER_NOT_FOUND);

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

          if (!room) return throwErrorMessage(ErrorMessage.ROOM_NOT_FOUND);
        }
        const message = await client.message.create({
          data: {
            payload,
            room: { connect: { id: room.id } },
            user: { connect: { id: loggedInUser.id } },
          },
        });
        pubsub.publish(PubSubMessage.NEW_MESSAGE, { roomUpdates: message });
        return throwOK();
      }
    ),
  },
};

export default resolver;
