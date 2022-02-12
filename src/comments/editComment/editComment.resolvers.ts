import { Resolvers, Comment } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";
import { ErrorMessage } from "@src/constants";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";

const resolver: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }: Comment, { loggedInUser, client }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) throwErrorMessage(ErrorMessage.COMMENT_NOT_FOUND);
        else if (comment.userId !== loggedInUser.id)
          return throwErrorMessage(ErrorMessage.NOT_AUTHORIZED);
        else {
          await client.comment.update({
            where: { id },
            data: { payload },
          });
          return throwOK();
        }
      }
    ),
  },
};

export default resolver;
