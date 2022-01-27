import { Resolvers, Photo } from "@src/types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: (_, { id }: Photo, { client }) =>
      client.photo.findUnique({ where: { id } }),
  },
};

export default resolvers;
