import { Resolvers, Photo, Hashtag, Like } from "@src/types";

const PAGE_SIZE = 7;

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
        where: { photos: { some: { id } } },
      }),
    likes: ({ id }: Photo, _, { client }) =>
      client.like.count({ where: { photoId: id } }),
  },
  Hashtag: {
    /**
     * photos: ({ id }: Hashtag, _, { client }) =>
     *   client.hashtag.findUnique({ where: { id } }).photos(),
     * 이런식으로 photos를 검색할 수 도 있지만,
     * 검색한 해시태그가 등록된 사진이 200만개라고 한다면,
     * 이를 한번에 불러와야 하는데
     * 이런 행동들이 DB를 죽이는 행동들이다.
     *
     * 이럴땐 cursor Pagination과 page based Pagination을 이용할 수 있다.
     * 코어부분에서 pagination이 구현된 computed field를 구현할 수 있을까?
     * 이를 구현하려면 먼저 arguments 와 context를 받을 수 있는지부터 알아야 한다.
     */
    /**
     * gql에서는 필드속에서도 arguments랑 context를 사용할 수 있다.
     * 이 말은 특정 mutation의 resolver가 아닌
     * 코어 필드에서도 pagination 같은 기능을 구현할 수 있다는 뜻 이다.
     * 즉, 모든게 resolver가 될 수 있고, 모든 arguments도 받을 수 있다는 뜻이다.
     * 이를 난무하면 코드가 점점 복잡해지겠지만,
     * 추가로 더 많은 것들을 구현해서 복잡해지는 것보다,
     * 필요한곳에 적절히 사용해 오히려 깔끔한 코드가 될 수 있다.
     *
     * 또한 context도 사용 가능하다는 점은
     * 해시태그 모델에서 모든 필드들이 열람 가능하면서,
     * photos같은 필드만 private하게 만들 수 있고,
     * 전부다 잠궈둘 수도 있다는 뜻이다.
     */
    photos: ({ id }: Hashtag, { lastId }: { lastId: number }, { client }) =>
      client.hashtag.findUnique({ where: { id } }).photos({
        take: PAGE_SIZE,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),

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
