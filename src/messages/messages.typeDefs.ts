import { gql } from "apollo-server";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!

    createdAt: String!
    UpdatedAt: String!
  }

  type Room {
    id: Int!

    unreadTotal: Int!
    users: [User]
    messages: [Message]

    createdAt: String!
    UpdatedAt: String!
  }
`;
