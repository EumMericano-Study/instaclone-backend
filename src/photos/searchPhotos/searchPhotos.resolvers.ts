import { Resolvers } from "@src/types";

const PAGE_SIZE = 7;

interface Args {
    keyword: string;
    lastId: number;
}

const resolvers: Resolvers = {
    Query: {
        searchPhotos: (_, { keyword, lastId }: Args, { client }) =>
            client.photo.findMany({
                where: { caption: { contains: keyword } },
                take: PAGE_SIZE,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            }),
    },
};

export default resolvers;
