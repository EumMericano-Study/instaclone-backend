import { gql } from "apollo-server";

/**
 * prisma에서 지원하는
 * 2가지 pageNation의 특징
 * 1. offsetPagenation
 *   게시판 항목처럼 클릭 시 중간 페이지들을 점프하여
 *   원하는 페이지에 있는 정보들을 보여주는데 사용하기 좋다.
 *   이케아 상품페이지, 에어비엔비 숙소 페이지 등
 *
 * 2. cursorPagenation
 *   무한 스크롤에 기반해
 *   다음 정보를 순차적으로, 누적해서 긁어올 때 좋다.
 *   - 인스타 팔로워, 핀터레스트, 인스타, 페이스북 피드 등
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
