import * as bcrypt from "bcrypt";
import client from "@src/client";
import { User } from "@src/types/user";

export default {
  Mutation: {
    editProfile: async (
      _: any,
      { firstName, lastName, userName, email, password }: User.Item
    ) => {
      let modulatedPassword;

      if (password) {
        modulatedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: 1 },
        /**
         * prisma에
         * undefined 요소를 전송해도
         * 자동으로 필터링 하여
         * 데이터베이스에 undefined가 저장되지 않는다.
         *
         */
        //
        data: {
          firstName,
          lastName,
          userName,
          email,
          ...(modulatedPassword && { password: modulatedPassword }),
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "회원정보 변경 실패",
        };
      }
    },
  },
};
