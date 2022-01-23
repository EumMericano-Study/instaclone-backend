import client from "@src/client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(
      async (_: any, { userName }, { loggedInUser }) => {
        const followUserInfo = await client.user.findUnique({
          where: { userName },
          select: { id: true },
        });
        if (!followUserInfo)
          return {
            ok: false,
            error: "유저 정보를 찾을 수 없습니다.",
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
