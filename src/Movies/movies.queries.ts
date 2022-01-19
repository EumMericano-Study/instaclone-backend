import client from "@src/client";
import { Movie } from "@src/types";

export default {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_: any, { id }: Movie.Item) =>
            client.movie.findUnique({ where: { id } }),
    },
};
