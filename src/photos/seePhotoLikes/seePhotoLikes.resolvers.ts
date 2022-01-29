import { Resolvers, Photo } from "@src/types";

const PAGE_SIZE = 7;

interface Args extends Photo {
  lastId: number;
}

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id, lastId }: Args, { client }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        /**
         * select와 inclde의 차이
         * select는 원하는 정보만 기술해서 받아오고
         * include는 모든 정보에 원하는 정보를 추가해서 받는다
         *  ex) likes의 모든 정보와 user정보 모두를 가져온다
         */
        select: {
          user: true,
          // userName만 가져오려면...?
          // 1. typeDefs 리턴 값 변경
          // 2. 추가 select문 작성
          //   {
          //     select: {
          //       userName: true,
          //     },
          //   },
        },
        take: PAGE_SIZE,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      // likes는 현재 객체에 한번 둘러쌓인 배열의 형태이다
      // [ { User } ]
      // 이를 map함수를 이용해 리턴한다.
      return likes.map((like) => like.user);
    },
  },
};

export default resolvers;
