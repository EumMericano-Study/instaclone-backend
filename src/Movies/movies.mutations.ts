import { Movie } from "@src/types";
import client from "@src/client";

export default {
    Mutation: {
        createMovie: (_: any, { title, year, genre }: Movie.Item) =>
            client.movie.create({ data: { title, year, genre } }),
        updateMovie: (_: any, { id, year }: Movie.Item) =>
            client.movie.update({ where: { id }, data: { year } }),
        deleteMovie: (_: any, { id }: Movie.Item) =>
            client.movie.delete({ where: { id } }),
    },
};
