import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

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
    deleteMovie(id: Int!): Boolean
  }
`;
interface MovieState {
  id: number;
  title: string;
  year: number;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }: MovieState) => ({ title: "hello", year: 2022 }),
  },
  Mutation: {
    createMovie: (_: any, { title, year, genre }: MovieState) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (_: any, { title }: MovieState) => {
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
