import client from "@src/client";
import { User } from "@src/types/user";

export default {
  Mutation: {
    createUser: (
      _: any,
      { firstName, lastName, userName, email, password }: User.Item
    ) =>
      client.user.create({
        data: { firstName, lastName, userName, email, password },
      }),
  },
};
