import { gql } from "apollo-server";
import { Movie } from "@src/types";
import client from "@src/client";

const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }
    type Mutation {
        createMovie(title: String!, year: Int!, genre: String): Movie
        updateMovie(id: Int!, year: Int!): Movie
        deleteMovie(id: Int!): Movie
    }
`;

const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_: any, { id }: Movie.Item) =>
            client.movie.findUnique({ where: { id } }),
    },
    Mutation: {
        createMovie: (_: any, { title, year, genre }: Movie.Item) =>
            client.movie.create({ data: { title, year, genre } }),
        updateMovie: (_: any, { id, year }: Movie.Item) =>
            client.movie.update({ where: { id }, data: { year } }),
        deleteMovie: (_: any, { id }: Movie.Item) =>
            client.movie.delete({ where: { id } }),
    },
};

export { typeDefs, resolvers };
