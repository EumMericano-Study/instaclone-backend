import client from "@src/client";
import { User } from "@src/types/user";

export default {
  Query: {
    seeProfile: (_: any, { userName }: User.Item) =>
      client.user.findUnique({
        where: { userName },
        /**
         * prisma의 include는 객체간의 관계를
         * 한번에 모두 보여주고 싶을 때 사용한다.
         *  include: {
         *    followers: true,
         *    following: true,
         *  },
         */
      }),
  },
};
