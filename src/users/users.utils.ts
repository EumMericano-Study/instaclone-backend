import * as jwt from "jsonwebtoken";
import { User } from "@src/types";
import client from "@src/client";
import { Resolver } from "@src/types/resolvers";
import { ErrorMessage } from "@src/constants";
import { throwErrorMessage } from "@src/shared/shared.utils";

export const getUserByAuth = async (Authorization: string) => {
  try {
    if (!Authorization) return null;

    const { id } = jwt.verify(Authorization, process.env.SECRET_KEY) as User;

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

export function protectedResolver(resolver: Resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      /**
       * info 영역으로 알수 있는 중 하나는
       * 해당 신호가 query인지 mutation인지에 대한 정보다
       * ※ info.operation.operation
       *
       * 모든 query문에서 리턴형태로
       * {
       *    ok: Boolean!
       *    error: String
       * }
       * 을 받는것이 아니라면 리턴형태에 맞게 protectedResolver의 리턴을
       * 맞춰줄 필요가 있다. (리턴형태가 달라 에러가 난다.)
       * Query문 선언시 리턴형태를 맞춰주기 위해 null을 리턴해주면 된다.
       */
      const query = info.operation.operation === "query";
      if (query) return null;
      else return throwErrorMessage(ErrorMessage.LOGIN_FIRST);
    }
    return resolver(root, args, context, info);
  };
}
