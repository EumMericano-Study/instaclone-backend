import { Resolvers } from "@src/types";

interface Args {
    userName: string;
    lastId: number;
}
const PAGE_SIZE = 7;

const resolvers: Resolvers = {
    Query: {
        seeFollowing: async (_, { userName, lastId }: Args, { client }) => {
            const followUserInfo = await client.user.findUnique({
                where: { userName },
                select: { id: true },
            });
            if (!followUserInfo)
                return {
                    ok: false,
                    error: "유저 정보를 찾을 수 없습니다.",
                };

            const following = await client.user
                .findUnique({ where: { userName } })
                .following({
                    take: PAGE_SIZE,
                    skip: lastId ? 1 : 0,
                    /**
                     * lastId가 define 되어있다면
                     * lastId를 가진 object를 만들고
                     * 아니라면 그냥 반환
                     */
                    ...(lastId && { cursor: { id: lastId } }),
                });
            return {
                ok: true,
                following,
            };
        },
    },
};

export default resolvers;
