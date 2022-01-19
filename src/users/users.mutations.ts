import client from "@src/client";
import { User } from "@src/types/user";

export default {
  Mutation: {
    createAccount: (
      _: any,
      { firstName, lastName, userName, email, password }: User.Item
    ) => {
      //TODO 1: userName과 email이 DB에 존재하는지 확인하기
      //TODO 2: 비밀번호 변조
      //TODO 3: 유저 정보 저장
      return client.user.create({
        data: { firstName, lastName, userName, email, password },
      });
    },
  },
};
