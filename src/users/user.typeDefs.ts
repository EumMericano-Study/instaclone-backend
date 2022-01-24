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
 * 이를 pageNation기능으로 구현하는 것이 추천된다.
 */

/**
 * gql에서는 Computed Fields라는 개념을 사용할 수 있다.
 * 서비스 페이지에서
 * 해당 페이지가 사용자마다 다르게 보일 값들을
 * 마치 DB에 저장되어있는것 처럼 뽑아올 수 있다.
 *
 * ex ) 인스타그램 내 페이지, 팔로우 한 페이지, 팔로우 하지 않은 페이지
 *     모두 다른 UI를 보여주고 (버튼이 바뀜)
 *     이를 구분할 수 있는 데이터를
 *     isMe, isFollowing과 같이 계산해서 한번에 보내줄 수 있음
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

        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
    }

    scalar Upload
`;
