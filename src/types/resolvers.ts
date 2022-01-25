import { Context } from "./context";

export type Resolver = (
    root: any,
    args: any,
    context: Context,
    info: any
) => any;

type Resolvers = {
    [key: string]: {
        [key: string]: Resolver;
    };
};

export default Resolvers;
