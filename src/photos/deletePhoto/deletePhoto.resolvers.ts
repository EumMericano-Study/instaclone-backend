import { protectedResolver } from "@src/users/users.utils";
import { Photo } from "@src/types";
import { ErrorMessage } from "@src/constants";

export default {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, { id }: Photo, { loggedInUser, client }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!photo)
          return {
            ok: false,
            error: ErrorMessage.PHOTO_NOT_FOUND,
          };
        else if (photo.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: ErrorMessage.NOT_AUTHORIZED,
          };
        } else {
          await client.photo.delete({ where: { id } });
          return { ok: true };
        }
      }
    ),
  },
};
