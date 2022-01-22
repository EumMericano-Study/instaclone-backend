import { gql } from "apollo-server";
import { GraphQLUpload } from "graphql-upload";

/**
 *  모델 제작 순서
 * 1. prisma schema 정의
 * 2. graphql schema 정의
 * 3. mutations, queries 정의
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
  }

  scalar Upload
`;
