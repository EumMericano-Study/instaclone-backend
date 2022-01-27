import { Resolvers, User } from "@src/types";

const PAGE_SIZE = 7;

/**
 * DB에는 존재하지 않지만 type에는 정의한
 * ComputedFields 항목의 resolver를
 * 내마음대로 설정할 수 있다.
 *
 * 호출 과정
 * Mutation 호출 시 totalFollowing값 호출 => Mutation을 통해 totalFollowing 값을 탐색
 * => 존재하지 않는다면 type resolver에서 탐색 => 없다면 에러, 있다면 출력
 *
 * root값은 mutation에서 호출된 객체의 정보를 담고 있다
 */

interface Root {
    id: number;
}
/**
 * 실제 인스타그램은 이런식으로 카운팅 하지 않음,
 * 너무 많은 데이터를 내포하다보니 실시간 동기화가 거의 불가능함
 * (DB를 여러개로 사용하기 때문)
 * 실제 인스타에서는 Eventual consistency라는 것을 사용
 *
 * ex) 호날두의 진짜 팔로워수는 나라마다 조금씩 상이할 수 있음.
 */
const resolvers: Resolvers = {
    // count 하기 위해 역으로 숫자를 셈
    // graphql에서 자동으로 await동작을 함
    User: {
        totalFollowing: ({ id }: Root, _, { client }) =>
            client.user.count({
                where: {
                    followers: {
                        some: { id },
                    },
                },
            }),
        totalFollowers: ({ id }: Root, _, { client }) =>
            client.user.count({
                where: {
                    following: {
                        some: { id },
                    },
                },
            }),
        isMe: ({ id }: Root, _, { loggedInUser }) => {
            if (!loggedInUser) return false;
            return id === loggedInUser.id;
        },
        isFollowing: async ({ id }: Root, _, { loggedInUser, client }) => {
            if (!loggedInUser) return false;
            //존재하면 1, 없으면 0
            const exists = await client.user.count({
                where: {
                    userName: loggedInUser.userName,
                    following: { some: { id } },
                },
            });
            return Boolean(exists);
        },
        photos: ({ id }: User, { lastId }: { lastId: number }, { client }) =>
            client.user.findUnique({ where: { id } }).photos({
                take: PAGE_SIZE,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            }),
    },
};

export default resolvers;
