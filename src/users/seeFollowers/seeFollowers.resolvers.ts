import client from "@src/client";
import { User } from "@src/types/user";

export default {
  Query: {
    seeFollowers: async (
      _: any,
      { userName, page }: { userName: string; page: number }
    ) => {
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
          take: 7,
          skip: (page - 1) * 7,
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};
