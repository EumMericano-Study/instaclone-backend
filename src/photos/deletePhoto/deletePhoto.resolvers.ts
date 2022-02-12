import { protectedResolver } from "@src/users/users.utils";
import { Photo } from "@src/types";
import { ErrorMessage } from "@src/constants";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, { id }: Photo, { loggedInUser, client }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!photo) return throwErrorMessage(ErrorMessage.PHOTO_NOT_FOUND);
        else if (photo.userId !== loggedInUser.id) {
          return throwErrorMessage(ErrorMessage.NOT_AUTHORIZED);
        } else {
          await client.photo.delete({ where: { id } });
          return throwOK();
        }
      }
    ),
  },
};
