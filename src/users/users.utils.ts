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
 *
 * ※ 상황
 * throw new Error로 로직을 처리하지 않고,
 * 추가 함수를 통해 특정한 결과값 (return { ok: false, error: "~~~"}) 을
 * 리턴하고 싶음
 *
 * 추가 함수에서 return {ok: false, error: "~~~"} 식으로 작성해서
 * 먼저 실행시킨다고 하더라도,
 * 아래 로직을 막을 방법이 없음
 * (if같은걸 쓴다면 가능하지만 코드를 더럽힐 수 밖에 없음)
 *
 * 그래서 Currying함수를 통해 함수에서 함수를 리턴받아
 * return { ok:false, error: "~~~" }를 리턴하려 함.
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
