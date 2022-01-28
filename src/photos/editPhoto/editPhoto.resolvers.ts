import { Resolvers } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";
import { parsingHashtags } from "../photos.utils";

interface Args {
    id: number;
    caption: string;
}

const resolvers: Resolvers = {
    Mutation: {
        editPhoto: protectedResolver(
            async (_, { id, caption }: Args, { loggedInUser, client }) => {
                /**
                 * 회원 정보 일치까지 한번에 검색하는 법
                 *
                 * 1. findUnique절은 @unique의 prisma ORM항목만 검색 가능하므로
                 *    findFirst 로 지정한다.
                 * 2. where절에 photo 인식자인 id와
                 *    userId가 동시에 일치함을 검색한다.
                 *
                 * 이렇게 검색하면 if (photo.userId !== loggedInUser.id) 같은
                 * if절을 추가할 필요 없이
                 * 한번에 두가지를 수용하는 결과를 얻을 수 있다.
                 */
                const existPhoto = await client.photo.findFirst({
                    where: {
                        id,
                        userId: loggedInUser.id,
                    },
                    include: {
                        hashtags: {
                            select: {
                                hashtag: true,
                            },
                        },
                    },
                });
                if (!existPhoto)
                    return {
                        ok: false,
                        error: "수정 권한이 없습니다.",
                    };

                await client.photo.update({
                    where: { id },
                    data: {
                        caption,
                        /**
                         * 해시태그 배열을 초기화 해준 다음
                         * 새로 계산된 해시태그 값들이 들어간다
                         */
                        hashtags: {
                            disconnect: existPhoto.hashtags,
                            connectOrCreate: parsingHashtags(caption),
                        },
                    },
                });

                return { ok: true };
            }
        ),
    },
};

export default resolvers;
