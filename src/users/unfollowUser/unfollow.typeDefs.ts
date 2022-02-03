import { gql } from "apollo-server";

export default gql`
    type Mutation {
        unFollowUser(userName: String!): MutationResponse!
    }
`;
