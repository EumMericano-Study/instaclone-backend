import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import client from "@src/client";
import { User, Context } from "@src/types";

export default {
    Mutation: {
        editProfile: async (
            _: any,
            {
                firstName,
                lastName,
                userName,
                email,
                password: newPassword,
            }: User.Item,
            { Authorization }: Context
        ) => {
            const { id } = (await jwt.verify(
                Authorization,
                process.env.SECRET_KEY
            )) as User.Token;

            let modulatedPassword = null;

            if (newPassword) {
                modulatedPassword = await bcrypt.hash(newPassword, 10);
            }

            /**
             * prisma에
             * undefined 요소를 전송해도
             * 자동으로 필터링 하여
             * 데이터베이스에 undefined가 저장되지 않는다.
             */
            const updatedUser = await client.user.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    ...(modulatedPassword && {
                        password: modulatedPassword,
                    }),
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
