import { User } from "./user";

export declare interface Context {
    loggedInUser: User.Item;
    protectResolver: (user: User.Item) => void;
}
