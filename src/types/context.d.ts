import { PrismaClient } from "@prisma/client";
import { User } from "./user";

export declare interface Context {
    loggedInUser: User.Item;
    client: PrismaClient;
    protectResolver: (user: User.Item) => void;
}
