import { Resolvers, Photo } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";
import { ErrorMessage } from "@src/constants";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";

const resolver: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }: Photo, { loggedInUser, client }) => {
        const findPhoto = await client.photo.findUnique({ where: { id } });
        if (!findPhoto) return throwErrorMessage(ErrorMessage.PHOTO_NOT_FOUND);

        const like = await client.like.findUnique({
          where: {
            userId_photoId: {
              userId: loggedInUser.id,
              photoId: id,
            },
          },
        });
        if (like) {
          await client.like.delete({
            where: { id: like.id },
          });
        } else {
          await client.like.create({
            data: {
              /**
               * 내가 했던 방법
               * userId: loggedInUser.id,
               * photoId: id,
               *
               * nico 방법
               *
               * relationship을 위해
               * connect로 연결해주어야 한다고 함
               */
              user: {
                connect: { id: loggedInUser.id },
              },
              photo: {
                connect: { id: findPhoto.id },
              },
            },
          });
        }
        return throwOK();
      }
    ),
  },
};

export default resolver;
