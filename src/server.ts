import { ApolloServer } from "apollo-server";

import schema from "@src/schema";

const server = new ApolloServer({ schema });

server
    .listen(4000)
    .then(() => console.log("Server is running on http://localhost:4000/"));
