import * as jwt from "jsonwebtoken";
import { User, Context } from "@src/types";
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

/**
 * Currying
 * 함수를 리턴하는 함수
 * 함수형 프로그래밍 - 코드를 짧고 간결하게, 반복을 최소화 할 수 있다.
 */

export function protectedResolver(resolver) {
    return function (root, args, context: Context, info) {
        if (!context.loggedInUser) {
            return {
                ok: false,
                error: "이 기능을 사용하기 위해 먼저 로그인 해주세요.",
            };
        }
        return resolver(root, args, context, info);
    };
}
