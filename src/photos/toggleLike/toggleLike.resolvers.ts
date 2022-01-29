import { Resolvers, Photo } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

const resolver: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }: Photo, { loggedInUser, client }) => {
        const findPhoto = await client.photo.findUnique({ where: { id } });
        if (!findPhoto)
          return {
            ok: false,
            error: "사진을 찾을 수 없습니다.",
          };

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
              userId: loggedInUser.id,
              photoId: id,
              /**
               * nico 방법
               *
               * user: {
               *  connect: { id: loggedInUser.id },
               * },
               * photo: {
               *  connect: { id: findPhoto.id },
               * },
               */
            },
          });
        }
        return { ok: true };
      }
    ),
  },
};

export default resolver;
