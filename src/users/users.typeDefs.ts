import { gql } from "apollo-server";

// 스텝 1. schema와 graphql 동기화
//  + 스키마를 새로 정의했다면 다시 migrate
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
`;
