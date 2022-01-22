import * as bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import client from "@src/client";
import { User, Context, Upload } from "@src/types";
import { protectedResolver } from "@src/users/users.utils";

/**
 * Currying 함수에서 리턴 될 함수
 * mutation에서 protector함수를 통과했을 경우
 * 실질적으로 실행될 resolver
 */
const resolverFn = async (
  _: any,
  {
    firstName,
    lastName,
    userName,
    email,
    password: newPassword,
    bio,
    avatar,
  }: User.Item,
  { loggedInUser }: Context
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = (await avatar) as Upload.FileUpload;

    /**
     * createReadStream과 createWriteStream을 pipe로 연결시킨다
     */
    const readStream = createReadStream();
    /**
     * process.cwd()
     *
     * current working directory
     * 현재 root 파일 경로 위치를 알려준다
     */
    const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const writeStream = createWriteStream(
      process.cwd() + "/src/uploads/" + newFileName
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFileName}`;
  }

  let modulatedPassword = null;

  if (newPassword) {
    modulatedPassword = await bcrypt.hash(newPassword, 10);
  }
  /**
   * prisma에
   * undefined 요소를 전송해도
   * 자동으로 필터링 하여
   * 데이터베이스에 undefined가 저장되지 않는다.
   */
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      userName,
      email,
      bio,
      ...(modulatedPassword && {
        password: modulatedPassword,
      }),
      ...(avatar && { avatar: avatarUrl }),
    },
  });

  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "회원정보 변경 실패",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
