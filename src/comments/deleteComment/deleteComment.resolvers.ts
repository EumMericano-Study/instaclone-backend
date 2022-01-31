import { protectedResolver } from "@src/users/users.utils";
import { Resolvers, Comment } from "@src/types";
import { ErrorMessage } from "@src/constants";

const resolver: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }: Comment, { loggedInUser, client }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment)
          return {
            ok: false,
            error: ErrorMessage.COMMENT_NOT_FOUND,
          };
        else if (comment.userId !== loggedInUser.id)
          return {
            ok: false,
            error: ErrorMessage.NOT_AUTHORIZED,
          };
        else {
          await client.comment.delete({ where: { id } });
          return { ok: true };
        }
      }
    ),
  },
};

export default resolver;
