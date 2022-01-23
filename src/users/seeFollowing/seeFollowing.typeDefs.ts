import { gql } from "apollo-server";

/**
 * cursor의 기준은 id, timestamp등 다양한 것들이 될 수 있다.
 * 현 프로젝트에서는 lastId를 cursor로 설정
 */
export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(userName: String!, lastId: Int): SeeFollowingResult!
  }
`;
