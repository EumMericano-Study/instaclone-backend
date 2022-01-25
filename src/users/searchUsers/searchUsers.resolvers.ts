import { Resolvers } from "@src/types";

interface Args {
    keyword: string;
    lastId: number;
}
const SEARCH_SIZE = 8;

const resolvers: Resolvers = {
    Query: {
        searchUsers: async (_, { keyword, lastId }: Args, { client }) =>
            client.user.findMany({
                where: {
                    userName: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
                take: SEARCH_SIZE,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            }),
    },
};

export default resolvers;
