import * as bcrypt from "bcrypt";
import client from "@src/client";
import { User } from "@src/types/user";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { firstName, lastName, userName, email, password }: User.Item
    ) => {
      try {
        //TODO 1: userName과 email이 DB에 존재하는지 확인하기
        const isExistingUser = await client.user.findFirst({
          where: { OR: [{ email }, { userName }] },
        });

        if (isExistingUser) {
          throw new Error("이미 사용중인 닉네임 혹은 이메일 주소 입니다 ");
        }
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
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "계정을 생성할 수 없습니다.",
        };
      }
    },
  },
};
