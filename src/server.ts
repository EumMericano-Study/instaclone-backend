import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "baby",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen(4000)
    .then(() => console.log("Server is running on http://localhost:4000/"));
