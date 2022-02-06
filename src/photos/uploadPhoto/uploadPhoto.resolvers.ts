import { protectedResolver } from "@src/users/users.utils";
import { Photo, Upload } from "@src/types";
import { parsingHashtags } from "../photos.utils";
import { uploadToS3 } from "@src/shared/shared.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }: Photo, { loggedInUser, client }) => {
        let hashtagObjs = [];
        if (caption) hashtagObjs = parsingHashtags(caption);
        const fileUrl = await uploadToS3({
          file: file as any as Upload,
          userId: loggedInUser.id,
          fileName: "uploads",
        });
        return client.photo.create({
          data: {
            file: fileUrl,
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
