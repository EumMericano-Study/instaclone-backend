import client from "@src/client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(
      async (_: any, { userName }, { loggedInUser }) => {
        const followUserInfo = await client.user.findUnique({
          where: {
            userName,
          },
        });
        if (!followUserInfo)
          return {
            ok: false,
            error: "잘못된 유저 정보를 입력하셨습니다.",
          };
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              connect: {
                userName,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
