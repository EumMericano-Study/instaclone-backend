import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "@src/schema";

const server = new ApolloServer({ typeDefs, resolvers });

server
    .listen(4000)
    .then(() => console.log("Server is running on http://localhost:4000/"));
