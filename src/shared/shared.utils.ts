import { Upload } from "@src/types";
import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

interface UploadPhotoArgs {
  file: Upload;
  userId: number;
}

export const uploadPhoto = async ({ file, userId }: UploadPhotoArgs) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const keyName = `${userId}-${Date.now()}-${filename}`;
  const upload = await new AWS.S3()
    .upload({
      Bucket: "instaclone-sexy-uploads",
      Key: keyName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return upload.Location;
};
