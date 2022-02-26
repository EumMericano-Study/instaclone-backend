import { Resolvers, Message } from "@src/types";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";
import { protectedResolver } from "@src/users/users.utils";
import { ErrorMessage } from "@src/constants";

const resolver: Resolvers = {
  Mutation: {
    readMessage: protectedResolver(
      async (_, { id }: Message, { loggedInUser, client }) => {
        const message = await client.message.findFirst({
          where: {
            id,
            userId: { not: loggedInUser.id },
            room: {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          select: { id: true },
        });

        if (!message) return throwErrorMessage(ErrorMessage.MESSAGE_NOT_FOUND);

        await client.message.update({
          where: { id },
          data: { read: true },
        });

        return throwOK();
      }
    ),
  },
};

export default resolver;
