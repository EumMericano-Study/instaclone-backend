import client from "@src/client";
import { User } from "@src/types/user";

export default {
  Query: {
    user: (_: any, { userName }: User.Item) =>
      client.user.findUnique({ where: { userName } }),
  },
};
