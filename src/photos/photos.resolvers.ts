import { Resolvers, Photo, Hashtag } from "@src/types";

const resolvers: Resolvers = {
  Photo: {
    /**
     * computed field
     * resolver의 parent 또는 root의 위치는
     * 해당 resolver를 호출한 위치의 객체가 호출된다.
     */
    user: ({ userId }: Photo, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),

    /**
     * hashtags 전체를 순회하여
     * 해시 태그 내부의 Photo정보에서
     * 주어진 photo id와 일치하는
     * 해시태그들을 검색
     */
    hashtags: ({ id }: Photo, _, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: { id },
          },
        },
      }),
  },
  Hashtag: {
    totalPhotos: ({ id }: Hashtag, _, { client }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      }),
  },
};

export default resolvers;
