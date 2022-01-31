import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "@src/types";
import { ErrorMessage } from "@src/constants";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { userName, password }, { client }) => {
      //TODO 1: userName으로 유저 정보 탐색
      const user = await client.user.findFirst({ where: { userName } });
      if (!user) {
        return {
          ok: false,
          error: ErrorMessage.WRONG_TYPED,
        };
      }
      // TODO 2: 패스워드 확인
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: ErrorMessage.WRONG_TYPED,
        };
      }
      // TODO 3: 유저에게 토큰발행
      /**
       * 토큰은 그저 우리가 서명했던 토큰임을 확인하기 위한 수단일 뿐,
       * 아무리 외부인이 복호화할 수 없더라도, (불가능 하지 않을 뿐더러)
       * 어떠한 개인정보도 있어선 안된다.
       */
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
