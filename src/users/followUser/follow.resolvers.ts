import { protectedResolver } from "../users.utils";

const resolvers = {
    Mutation: {
        followUser: protectedResolver(
            async (_, { userName }, { loggedInUser, client }) => {
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

export default resolvers;
