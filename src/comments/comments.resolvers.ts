import { Resolvers, Comment } from "@src/types";

const resolver: Resolvers = {
  Comment: {
    user: ({ userId }: Comment, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),

    photo: ({ photoId }: Comment, _, { client }) =>
      client.photo.findUnique({ where: { id: photoId } }),

    isMine: ({ userId }: Comment, _, { loggedInUser, client }) => {
      if (!loggedInUser || loggedInUser.id !== userId) return false;
      else return true;
    },
  },
};

export default resolver;
