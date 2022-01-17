import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type Movie {
        title: String
        year: Int
    }
    type Query {
        movies: [Movie]
        movie: Movie
    }
    type Mutation {
        createMovie(title: String!): Boolean
        deleteMovie(title: String!): Boolean
    }
`;
interface MovieState {
    title: string;
    year: number;
}

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({ title: "hello", year: 2022 }),
    },
    Mutation: {
        createMovie: (_: any, { title }: MovieState) => {
            console.log(title);
            return true;
        },
        deleteMovie: (_: any, { title }: MovieState) => {
            console.log(title);
            return true;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen(4000)
    .then(() => console.log("Server is running on http://localhost:4000/"));
