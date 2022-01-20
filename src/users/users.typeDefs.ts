import { gql } from "apollo-server";

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
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        seeProfile(userName: String!): User
    }
    type LoginResult {
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            userName: String!
            email: String!
            password: String!
        ): User
        login(userName: String!, password: String!): LoginResult!
    }
`;
