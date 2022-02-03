import { Resolvers, Comment } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";
import { ErrorMessage } from "@src/constants";

const resolver: Resolvers = {
    Mutation: {
        editComment: protectedResolver(
            async (_, { id, payload }: Comment, { loggedInUser, client }) => {
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
                    await client.comment.update({
                        where: { id },
                        data: { payload },
                    });
                    return { ok: true };
                }
            }
        ),
    },
};

export default resolver;
