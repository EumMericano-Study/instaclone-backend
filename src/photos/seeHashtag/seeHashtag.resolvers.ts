import { Resolvers } from "@src/types";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};
export default resolvers;
