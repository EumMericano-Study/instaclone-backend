import * as jwt from "jsonwebtoken";
import { User } from "@src/types";
import client from "@src/client";

export const getUserByAuth = async (Authorization: string) => {
    try {
        if (!Authorization) return null;

        const { id } = (await jwt.verify(
            Authorization,
            process.env.SECRET_KEY
        )) as User.Token;

        const loggedInUser = await client.user.findUnique({ where: { id } });

        if (loggedInUser) return loggedInUser;
        else return null;
    } catch {
        return null;
    }
};
