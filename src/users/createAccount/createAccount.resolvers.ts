import * as bcrypt from "bcrypt";
import { Resolvers, User } from "@src/types";
import { ErrorMessage } from "@src/constants";
import { throwErrorMessage, throwOK } from "@src/shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }: User,
      { client }
    ) => {
      try {
        //TODO 1: userName과 email이 DB에 존재하는지 확인하기
        const isExistingUser = await client.user.findFirst({
          where: { OR: [{ email }, { userName }] },
        });

        if (isExistingUser) return throwErrorMessage(ErrorMessage.EXIST_USER);
        //TODO 2: 비밀번호 변조 (hash=> password, saltRound)
        const modulatedPassword = await bcrypt.hash(password, 10);

        //TODO 3: 유저 정보 저장
        await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: modulatedPassword,
          },
        });
        return throwOK();
      } catch (e) {
        return throwErrorMessage(ErrorMessage.CANT_CREATE_USER);
      }
    },
  },
};

export default resolvers;
