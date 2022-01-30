import { Resolvers, Comment } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

const resolver: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }: Comment, { loggedInUser, client }) => {
        const isPhotoExists = await client.photo.findUnique({
          where: { id: photoId },
          /**
           * 오로지 사진 존재 여부만 체크할 것이므로
           * 비효율적으로 모두 가져오지 않고 id만 가져와서 확인한다
           */
          select: { id: true },
        });
        if (!isPhotoExists)
          return {
            ok: false,
            error: "사진이 존재하지 않습니다",
          };

        await client.comment.create({
          data: {
            payload,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: photoId,
              },
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};
export default resolver;
