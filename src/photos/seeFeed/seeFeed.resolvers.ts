import { Resolvers } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

const resolver: Resolvers = {
  Query: {
    seeFeed: protectedResolver((_, __, { loggedInUser, client }) =>
      client.photo.findMany({
        // 사진에 저장되어 있는 유저 정보에서
        // followers 목록을 탐색해 내 아이디가 있는 사진들을 가져온다
        // + 내 피드도 함께 확인한다.
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { user: { id: loggedInUser.id } },
          ],
        },
        // createdAt 내림차순 정렬
        orderBy: { createdAt: "desc" },
      })
    ),
  },
};

export default resolver;
