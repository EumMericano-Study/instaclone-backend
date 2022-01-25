import { Resolvers } from "@src/types";

interface Args {
    userName: string;
    page: number;
}

const PAGE_SIZE = 7;

const resolvers: Resolvers = {
    Query: {
        seeFollowers: async (_, { userName, page }: Args, { client }) => {
            const followUserInfo = await client.user.findUnique({
                where: { userName },
                select: { id: true },
            });
            if (!followUserInfo)
                return {
                    ok: false,
                    error: "유저 정보를 찾을 수 없습니다.",
                };

            /**
             * follower를 찾는 1번 방법
             * 호날두 계정에서 팔로워 검색하기
             * 페이지네이션 없이 팔로워 검색
             *
             * const aFollowers = await client.user
             * .findUnique({ where: { userName } })
             * .following();
             */
            /**
             * follower를 찾는 2번 방법
             * 유저 전체에서 호날두 계정을 팔로우 한 사람 검색하기
             * 페이지네이션 없이 팔로워 검색
             * const bFollowers = await client.user.findMany({
             * where: { following: { some: { userName }, }, }
             * });
             *
             */
            /**
             * follower를 찾는 3번 방법
             * 호날두 계정에서 팔로워 검색하기
             * offset 페이지네이션 활용
             */
            const followers = await client.user
                .findUnique({ where: { userName } })
                .following({
                    take: PAGE_SIZE,
                    skip: (page - 1) * PAGE_SIZE,
                });
            /**
             * 팔로워수 counting
             * count를 이용해 숫자를 센다.
             */
            const totalFollowers = await client.user.count({
                where: { following: { some: { userName } } },
            });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / PAGE_SIZE),
            };
        },
    },
};

export default resolvers;
