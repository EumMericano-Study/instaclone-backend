import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
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
                    throw new Error(
                        "이미 사용중인 닉네임 혹은 이메일 주소 입니다 "
                    );
                }
                //TODO 2: 비밀번호 변조 (hash=> password, saltRound)
                const modulatedPassword = await bcrypt.hash(password, 10);

                //TODO 3: 유저 정보 저장
                return client.user.create({
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        password: modulatedPassword,
                    },
                });
            } catch (e) {
                return e;
            }
        },
        login: async (_: any, { userName, password }: User.Item) => {
            //TODO 1: userName으로 유저 정보 탐색
            const user = await client.user.findFirst({ where: { userName } });
            if (!user) {
                return {
                    ok: false,
                    error: "입력하신 정보를 다시 확인해주세요",
                };
            }
            // TODO 2: 패스워드 확인
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "입력하신 정보를 다시 확인해주세요",
                };
            }
            // TODO 3: 유저에게 토큰발행
            /**
             * 토큰은 그저 우리가 서명했던 토큰임을 확인하기 위한 수단일 뿐,
             * 아무리 외부인이 복호화할 수 없더라도, (불가능 하지 않을 뿐더러)
             * 어떠한 개인정보도 있어선 안된다.
             */
            const token = await jwt.sign(
                { id: user.id },
                process.env.SECRET_KEY
            );
            return {
                ok: true,
                token,
            };
        },
    },
};
