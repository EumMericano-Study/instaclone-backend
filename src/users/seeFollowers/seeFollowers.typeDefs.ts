import { gql } from "apollo-server";

/**
 * prisma에서 지원하는
 * 2가지 pageNation의 특징
 *
 * 참고: https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination
 *
 * 1. offsetPagenation
 *   게시판 항목처럼 클릭 시 중간 페이지들을 점프하여
 *   원하는 페이지에 있는 정보들을 보여주는데 사용하기 좋다.
 *   이케아 상품페이지, 에어비엔비 숙소 페이지 등
 *   ※ 스킵의 갯수가 200,000개를 넘어가면 비효율 적이라고 함
 *     느리다 싶으면 cursor로 변경하기
 *
 *
 * 2. cursorPagenation
 *   무한 스크롤에 기반해
 *   다음 정보를 순차적으로, 누적해서 긁어올 때 좋다.
 *   - 인스타 팔로워, 핀터레스트, 인스타, 페이스북 피드 등
 *   ※ 구현이 귀찮지만 최적화 느낌이 있음
 *      규모확장하기가 편하지만 특정 페이지로의 이동은 힘들어진다
 */
export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowers(userName: String!, page: Int!): SeeFollowersResult!
  }
`;
