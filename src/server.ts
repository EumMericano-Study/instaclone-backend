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
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
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
