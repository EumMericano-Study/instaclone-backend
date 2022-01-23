import { gql } from "apollo-server";

/**
 *  모델 제작 순서
 * 1. prisma schema 정의
 * 2. graphql schema 정의
 * 3. mutations, queries 정의
 */

/**
 * gql에서 following, followers같이
 * 다른 테이블과 연관된 항목들은
 * db에 의도치 않은 과부화를 불러올 수 있으므로
 * prisma에서 기본적으로 막고 있다.
 * 이를 허용하고자 한다면
 *
 * prisma resolver설정에서 include를 설정을 하여야
 * 한번에 연관된 테이블의 내용까지 모두 보여줄 수 있다. (비추)
 * db에 부담이 될 relationship이라면
 * 이를 pagenation기능으로 구현하는 것이 추천된다.
 */

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!

    following: [User]
    followers: [User]
  }

  scalar Upload
`;
