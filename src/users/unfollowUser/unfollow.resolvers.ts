import client from "@src/client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unFollowUser: protectedResolver(
      async (_: any, { userName }, { loggedInUser }) => {
        const followUserInfo = await client.user.findUnique({
          where: { userName },
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
              disconnect: {
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
