import client from "@src/client";

interface Args {
    keyword: string;
    lastId: number;
}
const SEARCH_SIZE = 8;

export default {
    Query: {
        searchUsers: async (_: any, { keyword, lastId }: Args) =>
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
