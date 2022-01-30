import { Resolvers, Photo } from "@src/types";

interface Args extends Photo {
  lastId: number;
}

const PAGE_SIZE = 7;

const resolver: Resolvers = {
  Query: {
    seePhotoComments: (_, { id, lastId }: Args, { client }) =>
      client.comment.findMany({
        where: { photoId: id },
        orderBy: {
          createdAt: "asc",
        },
        take: PAGE_SIZE,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    /**
     * 만약
     * client.photo.findUnique({
     *    where: {
     *        id
     *    }
     * }).Comment()
     * 라는 식으로 호출하게 되면
     * DB에 막대한 부담을 줄 수 있다.
     *
     * 따라서 모두 검색하는 것은 한번 의심해볼 여지가 있고,
     * 이를 pagination화 해야 한다면
     * 다른 방식으로 검색한 후에 pagination화 해야 한다.
     */
  },
};

export default resolver;
