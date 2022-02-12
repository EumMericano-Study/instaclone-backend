import { protectedResolver } from "@src/users/users.utils";
import { Resolvers, Comment } from "@src/types";
import { ErrorMessage } from "@src/constants";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";

const resolver: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }: Comment, { loggedInUser, client }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) return throwErrorMessage(ErrorMessage.COMMENT_NOT_FOUND);
        else if (comment.userId !== loggedInUser.id)
          return throwErrorMessage(ErrorMessage.NOT_AUTHORIZED);
        else {
          await client.comment.delete({ where: { id } });
          return throwOK();
        }
      }
    ),
  },
};

export default resolver;
