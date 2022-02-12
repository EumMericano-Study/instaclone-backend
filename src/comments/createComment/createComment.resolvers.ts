import { Resolvers, Comment } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";
import { ErrorMessage } from "@src/constants";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";

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
          return throwErrorMessage(ErrorMessage.PHOTO_NOT_FOUND);

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
        return throwOK();
      }
    ),
  },
};
export default resolver;
