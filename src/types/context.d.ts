import { PrismaClient, User } from "@prisma/client";

export declare interface Context {
  loggedInUser: User;
  client: PrismaClient;
  protectResolver: (user: User) => void;
}
