import { protectedResolver } from "@src/users/users.utils";
import { Photo } from "@prisma/client";
import { parsingHashtags } from "../photos.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, caption }: Photo, { loggedInUser, client }) => {
                let hashtagObjs = [];
                if (caption) hashtagObjs = parsingHashtags(caption);

                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            // connect 키워드를 사용해 객체를 연결
                            // 로그인된 아이디를 연결해줌
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(hashtagObjs.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObjs,
                            },
                        }),
                    },
                });
                // TODO: 사진 저장 and 해시태그들 추가
                // TODO:  해시태그들에 사진 추가
            }
        ),
    },
};
