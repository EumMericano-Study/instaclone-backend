import client from "@src/client";
import { Movie } from "@src/types";

export default {
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
